import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAutenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;
  const usersRepository = new UsersRepository();
  const createUser = new CreateUsersService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  },
);
export default usersRouter;
