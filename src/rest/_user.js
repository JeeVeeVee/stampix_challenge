import Router from '@koa/router';
import { userService } from '../services/userService.js';
import Joi from 'joi';

const getAllUsers = async (ctx) => {
  ctx.body = await userService.getAll();
};

const getByFirstName = async (ctx) => {
  ctx.body = await userService.getByFirstName(ctx.params.firstname);
};

const createUser = async (ctx) => {
  ctx.body = await userService.create(ctx.request.body);
};
createUser.schema = {
  body: {
    gender: Joi.string(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string(),
    phoneFormats: Joi.string(),
    date_of_birth: Joi.string(),
    language: Joi.string(),
  },
};

export let buildUserRoute = async (app) => {
  const router = new Router({
    prefix: '/user',
  });
  router.get('/', getAllUsers);
  router.post('/', createUser);
  router.get('/:firstname', getByFirstName);
  //router.put('/:id', validate(updateSnackbarById.schema),updateSnackbarById)
  //router.delete('/:id', validate(deleteSnackbarForId.schema),deleteSnackbarForId)

  app.use(router.routes()).use(router.allowedMethods());
};
