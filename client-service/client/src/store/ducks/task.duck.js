import createAction from 'utils/createAction';
import produce from 'immer';
import {
  call,
  put,
  takeLatest,
  delay,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'api';
export const fetchTasksRoutine = createAction('FETCH_TASKS', 'task');
export const deleteTaskRoutine = createAction('DELETE_TASK', 'task');
export const updateTaskRoutine = createAction('UPDATE_TASK', 'task');
export const addTaskRoutine = createAction('ADD_TASK', 'task');

export const initialState = {
  data: [],
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchTasksRoutine.SUCCESS:
        draft.data = action.payload;
        break;
      case deleteTaskRoutine.SUCCESS:
        delete draft.data[
          draft.data.findIndex(task => task.id === action.payload)
        ];
        break;
      case addTaskRoutine.SUCCESS:
        draft.data.push(action.payload);
        break;
    }
  });

function* fetchTasks({ payload }) {
  const res = yield call(API.task.fetchTasks, payload);
  yield put(fetchTasksRoutine.success(res.data));
}

function* deleteTask({ payload }) {
  yield call(API.task.deleteTask, payload);
  yield put(deleteTaskRoutine.success(payload));
}

function* updateTask({ payload }) {
  yield delay(500);
  yield call(API.task.updateTask, payload);
  yield put(updateTaskRoutine.success());
}

function* addTask({ payload }) {
  const res = yield call(API.task.addTask, payload);
  yield put(addTaskRoutine.success(res.data));
}

export function* saga() {
  yield takeLatest(fetchTasksRoutine.TRIGGER, fetchTasks);
  yield takeLatest(deleteTaskRoutine.TRIGGER, deleteTask);
  yield takeLatest(updateTaskRoutine.TRIGGER, updateTask);
  yield takeLatest(addTaskRoutine.TRIGGER, addTask);
}
