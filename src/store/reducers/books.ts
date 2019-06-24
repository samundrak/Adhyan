import { produce } from 'immer';
import { BOOKS_LOADED } from '../types';

const initialState = {
  items: [],
};
export default produce((draft, action) => {
  switch (action.type) {
    case BOOKS_LOADED:
      draft.items = action.data;
      break;
  }
}, initialState);
