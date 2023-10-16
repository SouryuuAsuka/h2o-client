import { Transaction } from "../../../types";

export interface DataState {
  loading: {
    transactions: boolean,
    stats: boolean
  };
  stats: {
    client: Stats,
    business: Stats
  };
  problems: Problem[];
  transactions: Transaction[];
}
interface Problem {
  id: number;
  title: string;
  amount: number;
}
interface Stats {
  persent: number,
  amount: number
}
const initialState: DataState = {
  transactions: [],
  stats: {
    client: {
      persent: 0,
      amount: 0
    },
    business: {
      persent: 0,
      amount: 0
    },
  },
  problems: [],
  loading: {
    transactions: false,
    stats: false,
  }
};

export const dataReducer = (state = initialState, action: any): DataState => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        transactions: action.payload,
      };
    case 'SET_STATS':
      return {
        ...state,
        stats: action.payload,
      };
    case 'SET_PROBLEMS':
      return {
        ...state,
        problems: action.payload,
      };
    case 'SET_LOADING_TRANSACTIONS':
      return {
        ...state,
        loading: {
          ...state.loading,
          transactions: true,
        }
      };
    case 'SET_NOT_LOADING_TRANSACTIONS':
      return {
        ...state,
        loading: {
          ...state.loading,
          transactions: false,
        }
      };
    case 'SET_LOADING_STATS':
      return {
        ...state,
        loading: {
          ...state.loading,
          stats: true,
        }
      };
    case 'SET_NOT_LOADING_STATS':
      return {
        ...state,
        loading: {
          ...state.loading,
          stats: false,
        }
      };
    default:
      return state;
  }
};