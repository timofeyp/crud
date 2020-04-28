import getSessionExports from 'api/session';
import getTaskExports from 'api/task';
import { axios, setTokens } from 'api/client';

const session = getSessionExports(axios);
const task = getTaskExports(axios);

export default {
  session,
  task,
  setTokens,
};
