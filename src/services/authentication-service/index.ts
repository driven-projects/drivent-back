import sessionRepository from '@/repositories/session-repository';
import userRepository from '@/repositories/user-repository';
import { exclude } from '@/utils/prisma-utils';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors';
import axios from 'axios';
import userService from '../users-service';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function oauthSignIn(code: string) {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  const res = await axios.post(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    config,
  );

  const access_token: string = res.data.access_token;

  const userEmail = await axios.get('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const email: string = userEmail.data[0].email;

  const user = await userRepository.findByEmail(email);

  if (!user) {
    const createdUser = await userService.createGithubUser(email);
    const token = await createSession(createdUser.id);
    return {
      user: exclude(createdUser, 'password'),
      token,
    };
  }

  if (user.isGithubUser === false) {
    await userRepository.updateUser(user.email);
    const token = await createSession(user.id);
    return {
      user: exclude(user, 'password'),
      token,
    };
  }

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  oauthSignIn,
};

export default authenticationService;
export * from './errors';
