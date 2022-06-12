import { githubSignIn, singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';
import { Router } from 'express';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.post('/github/sign-in', githubSignIn);

export { authenticationRouter };
