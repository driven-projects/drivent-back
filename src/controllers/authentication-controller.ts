import authenticationService, { SignInParams } from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
//For eslint boundaries check only
//import sessionRepository from "@/repositories/session-repository";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;
  // sessionRepository.create({
  //   userId: 0,
  //   token: ""
  // });

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
