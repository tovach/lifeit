import { AppAction } from './actions';

export interface AppState {
  value: number;
  loading: boolean;
}

const initialState: AppState = {
  value: 0,
  loading: false,
};

export const reducer = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case 'OPERATION_SUCCESS':
      return {
        ...state,
        value: action.payload,
        loading: false,
      };
    case 'INCREMENT_ASYNC':
    case 'DECREMENT_ASYNC':
    case 'INCREMENT_BY_VALUE_ASYNC':
    case 'DECREMENT_BY_VALUE_ASYNC':
      return {
        ...state,
        loading: true,
      };
    case 'CANCEL_OPERATION':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
