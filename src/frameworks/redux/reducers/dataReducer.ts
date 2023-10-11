import { Transaction } from "../../../interfaces";

interface DataState {
  transactions: Transaction[];
}

const initialState: DataState = {
  transactions: [],
};

export const dataReducer = (state = initialState, action: any): DataState => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        transactions: action.payload,
      };
    case 'SET_APP_NOT_LOADING':
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};