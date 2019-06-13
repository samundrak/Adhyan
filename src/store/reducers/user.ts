import { produce } from 'immer';
import { UserInterface } from '../../interfaces';
import { SET_USER } from '../types';

const initialState: UserInterface = {
  displayName: '',
  photoURL: '',
  uid: '',
  createdAt: null,
};

export default produce((draft: UserInterface, action) => {
  switch (action.type) {
    case SET_USER:
      return action.data;
  }
}, initialState);
