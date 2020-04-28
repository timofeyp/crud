import axios from 'axios';

const jwtData = {
  token: null,
  refreshToken: null,
};

const refreshRequest = async () =>
  axios.post('/api/auth/refresh', {
    refreshToken: jwtData.refreshToken,
  });

axios.interceptors.request.use(
  config => {
    if (!jwtData.token) {
      return config;
    }

    const newConfig = {
      headers: {},
      ...config,
    };

    newConfig.headers.authorization = jwtData.token;
    return newConfig;
  },
  e => Promise.reject(e),
);

axios.interceptors.response.use(
  r => r,
  async error => {
    if (
      !jwtData.refreshToken ||
      error.response.status !== 401 ||
      error.config.retry
    ) {
      throw error;
    }

    const { data } = await refreshRequest();
    jwtData.token = data.token;
    jwtData.refreshToken = data.refreshToken;
    const newRequest = {
      ...error.config,
      retry: true,
    };

    return axios(newRequest);
  },
);

const setTokens = ({ token, refreshToken }) => {
  jwtData.token = token;
  jwtData.refreshToken = refreshToken;
};

export { axios, setTokens };
