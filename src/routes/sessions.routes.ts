import { Router } from 'express';

import AuthenticateUserService from './../services/AuthenticateUserService';

const sessionsRouter = Router();
interface UserAuthDTO {
  email: string;
  password?: string;
}

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const autenthicateUser = new AuthenticateUserService();

    const { user: hasUserInfo, token } = await autenthicateUser.execute({
      email,
      password,
    });

    const user: UserAuthDTO = hasUserInfo;

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default sessionsRouter;
