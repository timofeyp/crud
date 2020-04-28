import { call } from 'redux-saga/effects';

const getExports = axios => {
  function* fetchTasks() {
    return yield call(axios.get, '/api/task');
  }

  function* deleteTask(id) {
    return yield call(axios.delete, `/api/task/${id}`);
  }

  function* addTask(value) {
    return yield call(axios.post, '/api/task', value);
  }

  function* updateTask(values) {
    return yield call(axios.put, '/api/task', values);
  }

  return { fetchTasks, deleteTask, addTask, updateTask };
};

export default getExports;
