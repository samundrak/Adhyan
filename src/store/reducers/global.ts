import { produce } from 'immer';
import { GLOBAL_LOADING } from '../types';

const initialState = { loading: false };
export default produce((draft, action) => {
  switch (action.type) {
    case GLOBAL_LOADING:
      draft.status = action.data;
      break;
  }
}, initialState);
