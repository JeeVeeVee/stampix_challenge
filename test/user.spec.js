import createServer from '../src/createServer.js';
let axios = require(axios);

const BASE_URL = 'http://localhost:3000';

describe('users', () => {
  let server;
  beforeAll(async () => {
    server = await createServer();
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  const endpoint = 'users';
  describe('GET /users', () => {
    let response = null;
    test('if all goes well exit status should be 200', async () => {
      response = await axios.get(BASE_URL + endpoint);
      expect(response.status).toBe(200);
    });
    test('there should be 50 entries', () => {
      expect(response.size).toEqual(50);
    });
  });
});
