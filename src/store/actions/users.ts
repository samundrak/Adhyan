import { SET_USER } from '../types';
import { UserInterface } from '../../interfaces';

export function setUser(user: UserInterface) {
  return {
    type: SET_USER,
    data: user,
  };
}
