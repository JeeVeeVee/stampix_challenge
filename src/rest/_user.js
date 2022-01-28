import Router from '@koa/router';
import { userService } from '../services/userService.js';
import Joi from 'joi';
import { validator } from './_validation.js';

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
    phone_number: Joi.string(),
    date_of_birth: Joi.string(),
    language: Joi.string(),
  },
};

export let buildUserRoute = async (app) => {
  const router = new Router({
    prefix: '/user',
  });
  router.get('/', getAllUsers);
  router.post('/', validator(createUser.schema), createUser);
  router.get('/:firstname', getByFirstName);

  app.use(router.routes()).use(router.allowedMethods());
};
