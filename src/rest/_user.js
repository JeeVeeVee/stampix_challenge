module.exports = async (app) => {
  const router = new Router({
    prefix: '/user',
  });
  router.get('/', getAll);
  //router.post('/',validate(createResto.schema) , createResto)
  //router.get('/:snackbar_id', getById);//validate(getById.schema),getById);
  //router.put('/:id', validate(updateSnackbarById.schema),updateSnackbarById)
  //router.delete('/:id', validate(deleteSnackbarForId.schema),deleteSnackbarForId)

  app.use(router.routes()).use(router.allowedMethods());
};
