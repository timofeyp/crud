import createAction from 'utils/createAction';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import produce from 'immer';
import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import { push } from 'connected-react-router';
import API from 'api';
export const fetchSessionRoutine = createAction('FETCH_SESSION', 'session');
export const setTokensRoutine = createAction('SET_TOKENS', 'session');
export const fetchAuthRoutine = createAction('FETCH_AUTH', 'session');
export const fetchRegisterRoutine = createAction('FETCH_REGISTER', 'session');
export const logoutRoutine = createAction('LOGOUT', 'session');

export const initialState = {
  userId: null,
  token: null,
  refreshToken: null,
  isAuth: false,
  isSessionLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = persistReducer(
  { storage, key: 'session', whitelist: ['userId', 'token', 'refreshToken'] },
  (state = initialState, action) =>
    produce(state, draft => {
      switch (action.type) {
        case setTokensRoutine.TRIGGER:
          draft.isSessionLoading = true;
          break;
        case fetchAuthRoutine.TRIGGER:
          draft.isSessionLoading = true;
          break;
        case fetchAuthRoutine.SUCCESS:
          draft.userId = action.payload.userId;
          draft.token = action.payload.token;
          draft.refreshToken = action.payload.refreshToken;
          draft.isAuth = true;
          draft.isSessionLoading = false;
          break;
        case fetchAuthRoutine.FAILURE:
          draft.isSessionLoading = false;
          break;
        case fetchSessionRoutine.SUCCESS:
          draft.userId = action.payload.userId;
          draft.isSessionLoading = false;
          draft.isAuth = true;
          break;
        case logoutRoutine.SUCCESS:
        case fetchSessionRoutine.FAILURE:
          draft.userId = null;
          draft.token = null;
          draft.refreshToken = null;
          draft.isSessionLoading = false;
          draft.isAuth = false;
          break;
      }
    }),
);

function* fetchAuth({ payload }) {
  const { values, formikActions } = payload;
  try {
    const res = yield call(API.session.fetchAuth, values);
    const { data } = res;
    API.setTokens(data);
    yield put(fetchAuthRoutine.success(data));
    yield put(push('/'));
  } catch {
    formikActions.setSubmitting(false);
    formikActions.setStatus('ERROR');
    yield put(fetchAuthRoutine.failure());
  }
}

function* fetchRegister({ payload }) {
  const { values, formikActions } = payload;
  const res = yield call(API.session.fetchRegister, values);
  const { user } = res.data;
  formikActions.setStatus(`USER REGISTERED: ${user.name}`);
}

function* setTokens() {
  const { token, refreshToken } = yield select(store => store.session);
  API.setTokens({ token, refreshToken });
  yield put(fetchSessionRoutine.trigger());
}

function* fetchSession() {
  try {
    const res = yield call(API.session.fetchSession, '/api/auth/session');
    yield put(fetchSessionRoutine.success(res.data));
    yield put(push('/'));
  } catch (err) {
    yield put(fetchSessionRoutine.failure());
  }
}

function* fetchLogout() {
  const { refreshToken } = yield select(store => store.session);
  yield call(API.session.fetchLogout, { refreshToken });
  yield put(logoutRoutine.success());
  yield put(push('/login'));
}

export function* saga() {
  yield takeLatest(fetchSessionRoutine.TRIGGER, fetchSession);
  yield takeLatest(logoutRoutine.TRIGGER, fetchLogout);
  yield takeLatest(fetchAuthRoutine.TRIGGER, fetchAuth);
  yield takeLatest(setTokensRoutine.TRIGGER, setTokens);
  yield takeLatest(fetchRegisterRoutine.TRIGGER, fetchRegister);
}
