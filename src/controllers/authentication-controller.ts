import authenticationService, { SignInParams } from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
//For eslitn boundaries check only
//import sessionRepository from "@/repositories/session-repository";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;
  sessionRepository.create({
    userId: 0,
    token: ""
  });
  const result = await authenticationService.signIn({ email, password });

  res.status(httpStatus.OK).send(result);
}
