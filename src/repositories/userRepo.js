import { Knex } from '../data/index.js';

const findAllUsers = async () => {
  const output = await Knex.getKnex()(Knex.tables.user).select();
  return output;
};

export const userRepo = {
  findAllUsers,
};
