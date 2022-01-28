import { userRepo } from '../repositories/userRepo.js';

let getAll = async () => {
  return await userRepo.findAllUsers();
};

let getByFirstName = async (firstname) => {
  return await userRepo.findByFirstName(firstname);
};

export let userService = {
  getAll,
  getByFirstName,
};
