import { Knex } from '../data/index.js';

const findAllUsers = async () => {
  const output = await Knex.getKnex()(tables.user).select();
  return output;
};
