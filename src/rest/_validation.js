import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import installRest from './rest';
//import { initializeData } from './data';
import koaCors from '@koa/cors';
import ServiceError from './core/serviceError';

const CORS_ORIGINS = ['http://localhost:3000'];
const CORS_MAX_AGE = 3 * 60 * 60;

module.exports = async function createServer() {
  //await initializeData();

  const app = new Koa();
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin.toString()) !== -1) {
          return ctx.request.header.origin;
        }
        // Not a valid domain at this point, let's return the first valid as we should return a string
        return CORS_ORIGINS[0];
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    })
  );
  app.use(bodyParser());
  app.use(async (ctx, next) => {
    try {
      await next();

      if (ctx.status === 404) {
        ctx.body = {
          code: 'NOT_FOUND',
          message: `Unknown resource: ${ctx.url}`,
        };
      }
    } catch (error) {
      console.error('Error occured while handling a request', {
        error: error,
      });

      let statusCode = error.status || 500;
      let errorBody = {
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== 'production' ? error.stack : undefined,
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        }

        if (error.isValidationFailed) {
          statusCode = 400;
        }

        if (error.isUnauthorized) {
          statusCode = 401;
        }

        if (error.isForbidden) {
          statusCode = 403;
        }
      }
      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  await installRest(app);

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        app.listen(PORT);
        console.info(`🚀 Server listening on http://localhost:9000`);
        resolve();
      });
    },

    async stop() {
      {
        app.removeAllListeners();
        await shutdownData();
        getLogger().info('Goodbye');
      }
    },
  };
};
