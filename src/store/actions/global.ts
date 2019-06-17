import { GLOBAL_LOADING } from '../types';

export function loading(status: boolean) {
  return {
    type: GLOBAL_LOADING,
    data: status,
  };
}
