import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersControllers from '../controllers/UsersControllers';
import UsersAvatarControllers from '../controllers/UsersAvatarControllers';

import ensureAuthenticated from '../middlewares/ensureAutenticated';

const usersRouter = Router();
const usersAvatarControllers = new UsersAvatarControllers();
const usersControllers = new UsersControllers();
const upload = multer(uploadConfig);

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarControllers.upadate,
);
export default usersRouter;
