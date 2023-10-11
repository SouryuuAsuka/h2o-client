import { call, put, throttle, all } from 'redux-saga/effects';
import Api from '../axios/Api';

export function* rootSaga() {
  yield all([
    helloSaga(),
    watchGetUser(),
    watchGetTransactions(),
  ])
}

function* helloSaga() {
  console.log('Hello Sagas!')
}
const setAppLoading = () => {
  return { type: 'SET_APP_LOADING' }
};

const setAppNotLoading = () => {
  return { type: 'SET_APP_NOT_LOADING' }
};

export const showPopupLogin = () => {
  return { type: 'SHOW_POPUP_LOGIN' }
};

export const hidePopupLogin = () => {
  return { type: 'HIDE_POPUP_LOGIN' }
};

export const setUser = (data: any) => {
  return { type: 'SET_USER', user: data }
}

export const getUser = () => {
  return { type: 'GET_USER' }
};

export function* watchGetUser(): any {
  yield throttle(1000, 'GET_USER', getUserAsync)
};

export function* getUserAsync(): any {
  try {
    const response: any = yield call(Api.get, '/users', { headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') } });
    const data = response?.data?.data?.user;
    const user = {
      id: data.user_id ?? 1,
      name: data.username ?? null,
      avatar: data.avatar ?? null,
      isLogin: true
    }
    yield put(setUser(user));
  } catch {
    
  } finally {
    yield put(setAppNotLoading());
  }

};

export const getTransactions = (interval: string) => {
  return { type: 'GET_DATA', interval }
};

export const setTransactions = (data: any) => {
  return { type: 'SET_DATA', payload: data }
}

function* watchGetTransactions(): any {
  yield throttle(1000, 'GET_DATA', getDataAsync)
}
export function* getDataAsync(action: any): any {
  console.log(JSON.stringify(action));
  const response: any = yield call(Api.get, '/transactions/', { headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') } });
  const data = response?.data?.data;
  yield put(setTransactions(data));
}
