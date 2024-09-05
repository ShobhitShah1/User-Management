import axios from 'axios';
import {UserList} from '../types/interfaces';

const BASE_URL = 'https://randomuser.me/api/';

export const getUserData = async (page: number): Promise<UserList[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?results=10&page=${page}`);
    return response.data?.results;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
