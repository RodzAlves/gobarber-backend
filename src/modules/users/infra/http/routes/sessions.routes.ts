import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();
interface UserAuthDTO {
  email: string;
  password?: string;
}

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const autenthicateUser = new AuthenticateUserService();

  const { user: hasUserInfo, token } = await autenthicateUser.execute({
    email,
    password,
  });

  const user: UserAuthDTO = hasUserInfo;

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
