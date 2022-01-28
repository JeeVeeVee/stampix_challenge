import { userRepo } from '../repositories/userRepo.js';

let getAll = async () => {
  return await userRepo.findAllUsers();
};

let getById;
export let userService = {
  getAll,
  getById,
};
