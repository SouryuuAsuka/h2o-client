import { createStore, applyMiddleware, combineReducers } from 'redux';
import { userReducer, appReducer, dataReducer, UserState, AppState, DataState } from './reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers<{
  user: UserState;
  app: AppState;
  data: DataState;
}>({
  user: userReducer,
  app: appReducer,
  data: dataReducer,
});
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


