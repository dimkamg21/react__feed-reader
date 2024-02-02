import { getData } from '../helpers/fetchClient';

export const getUser =  <T>(username: string): Promise<T[]> => {
  return getData(`/users?email=${username}`);
};
