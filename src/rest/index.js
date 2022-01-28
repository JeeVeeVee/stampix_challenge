import Router from '@koa/router';

export let installRest = async (app) => {
  const router = new Router({
    prefix: '',
  });

  app.use(router.routes()).use(router.allowedMethods());
};
