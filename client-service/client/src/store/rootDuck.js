import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as session from 'store/ducks/session.duck';
import * as task from 'store/ducks/task.duck';
import history from 'utils/history';

export const rootReducer = combineReducers({
  session: session.reducer,
  task: task.reducer,
  router: connectRouter(history),
});

export function* rootSaga() {
  yield all([session.saga(), task.saga()]);
}
