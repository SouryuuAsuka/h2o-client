export interface UserState {
  id: number | null,
  name: string | null,
  avatar: number;
  isLogin: boolean | null;
}
const initialState: UserState = {
  id: null,
  name: null,
  avatar: 1,
  isLogin: false,
};
export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user,
      };

    default:
      return state;
  }
};