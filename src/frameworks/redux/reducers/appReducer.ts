
interface Popups {
  login: boolean;
}
export interface AppState {
  loading: boolean | null;
  popups: Popups;
  search: string;
}

const initialState: AppState = {
  loading: true,
  search:'',
  popups: {
    login: false,
  }
};

export const appReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SET_APP_NOT_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'SHOW_POPUP_LOGIN':
      return {
        ...state,
        popups: {
          ...state.popups,
          login: true
        }
      };
    case 'HIDE_POPUP_LOGIN':
      return {
        ...state,
        popups: {
          ...state.popups,
          login: false
        }
      };
    default:
      return state;
  }
};