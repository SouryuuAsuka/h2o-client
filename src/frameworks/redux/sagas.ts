import { call, put, throttle, all } from 'redux-saga/effects';
import Api from '../axios/Api';

export function* rootSaga() {
  yield all([
    helloSaga(),
    watchGetUser(),
    watchGetTransactions(),
    watchGenStats(),
    watchGenProblems(),
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

const setLoadingTransactions = () => {
  return { type: 'SET_LOADING_TRANSACTIONS' }
};

const setNotLoadingTransactions = () => {
  return { type: 'SET_NOT_LOADING_TRANSACTIONS' }
};

const setLoadingStats = () => {
  return { type: 'SET_LOADING_STATS' }
};

const setNotLoadingStats = () => {
  return { type: 'SET_NOT_LOADING_STATS' }
};
function* watchGetTransactions(): any {
  yield throttle(1000, 'GET_DATA', getDataAsync)
};
const setStats = (data: any) => {
  return { type: 'SET_STATS', payload: data }
}

function* getDataAsync(action: any): any {
  yield put(setLoadingTransactions());
  const response: any = yield call(Api.get, '/transactions?i=' + action.interval, { headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') } });
  const data = response?.data?.data;
  yield put(setTransactions(data));
  yield put(setNotLoadingTransactions());
}
function* watchGenStats(): any {
  yield throttle(1000, 'GEN_STATS', genStatsAsync)
}
export const genStats = () => {
  return { type: 'GEN_STATS' }
};
function* genStatsAsync(action: any): any {
  yield put(setNotLoadingStats());
  const base = 8000000;
  const busRand = (Math.random() - 0.5) * 2;
  const cliRand = (Math.random() - 0.5) * 2;
  console.log("cliRand - " + cliRand + ' persent ' + Math.floor(cliRand * 2000) / 10)
  const data = {
    client: {
      persent: Math.floor(cliRand * 1000) / 10,
      amount: Math.floor(base * cliRand),
    },
    business: {
      persent: Math.floor(busRand * 1000) / 10,
      amount: Math.floor(base * busRand),
    }
  }
  yield put(setStats(data));
  yield put(setLoadingStats());
}
const setProblems = (data: any) => {
  return { type: 'SET_PROBLEMS', payload: data }
}
function* watchGenProblems(): any {
  yield throttle(1000, 'GEN_PROBLEMS', genProblemsAsync)
}
export const genProblems = () => {
  return { type: 'GEN_PROBLEMS' }
};
function* genProblemsAsync(action: any): any {
  const base = 70000;
  const titles = [
    'Линейный персонал',
    'Подразделение разовых работ ФОТ',
    'Бензин (наличные)',
    'Закупка инвентаря',
    'Закупка спецодежды/СИЗ',
    'Ремонт оборудования',
    'Обслуживание автомобиля',
    'Форс-мажоры',
    'Рекламные бюджеты (Блогеры)',
    'Рекламные бюджеты (Контекст)',
  ]
  const data = titles.map((tit, index) => {
    const rand = (Math.random() + Math.random()) / 2;
    return {
      id: index,
      title: tit,
      amount: Math.floor((rand * base) + 10000)
    }
  })

  yield put(setProblems(data));
}
