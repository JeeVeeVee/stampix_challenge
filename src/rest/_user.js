import Router from '@koa/router';
import { userService } from '../services/userService.js';

const getAllUsers = async (ctx) => {
  ctx.body = await userService.getAll();
};

const getByFirstName = async (ctx) => {
  ctx.body = await userService.getByFirstName(ctx.params.firstname);
};

export let buildUserRoute = async (app) => {
  const router = new Router({
    prefix: '/user',
  });
  router.get('/', getAllUsers);
  //router.post('/',validate(createResto.schema) , createResto)
  router.get('/:firstname', getByFirstName);
  //router.put('/:id', validate(updateSnackbarById.schema),updateSnackbarById)
  //router.delete('/:id', validate(deleteSnackbarForId.schema),deleteSnackbarForId)

  app.use(router.routes()).use(router.allowedMethods());
};
