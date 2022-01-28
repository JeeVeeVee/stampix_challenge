import { createServer } from './createServer.js';

async function main() {
  try {
    console.log('start');
    const server = await createServer();
    await server.start();

    async function onClose() {
      await server.stop();
      process.exit(0);
    }

    process.on('SIGTERM', onClose);
    process.on('SIGQUIT', onClose);
  } catch (error) {
    console.log(error.message);
    process.exit(-1);
  }
}

// Wrap inside a main function as top level await is not supported in all NodeJS versions
main();