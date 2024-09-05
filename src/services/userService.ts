import axios from 'axios';
import {UserList} from '../types/interfaces';

const BASE_URL = 'https://randomuser.me/api/';
const MAX_DATA = 10;

export const getUserData = async (page: number): Promise<UserList[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}?results=${MAX_DATA}&page=${page}`,
    );
    return response.data?.results || [];
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error?.message ||
          'Something went wrong',
      );
    } else {
      throw new Error('Something went wrong');
    }
  }
};
