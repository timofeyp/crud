import { call } from 'redux-saga/effects';

const getExports = axios => {
  function* fetchAuth(values) {
    return yield call(axios.post, '/api/auth/login', values);
  }

  function* fetchRegister(values) {
    return yield call(axios.post, '/api/auth/register', values);
  }

  function* fetchSession() {
    return yield call(axios.get, '/api/auth/session');
  }

  function* fetchLogout(values) {
    return yield call(axios.post, '/api/auth/logout', values);
  }

  return { fetchAuth, fetchSession, fetchLogout, fetchRegister };
};

export default getExports;
