import Router from '@koa/router';
import { buildUserRoute } from './_user.js';

export let installRest = async (app) => {
  const router = new Router({
    prefix: '',
  });
  await buildUserRoute(router);
  app.use(router.routes()).use(router.allowedMethods());
};
