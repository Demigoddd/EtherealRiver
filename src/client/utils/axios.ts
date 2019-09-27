import Axios, { AxiosError } from 'axios';

import { UserAction } from './state/actions';

enum HTTP_STATUS_CODES {
  UNAUTHORIZED = 401
}

const axios = Axios.create({
  baseURL: (window as any).appConfig.URL
});

// Request Interceptors
axios.interceptors.request.use(
  (config) => {
    try {
      let token = localStorage.getItem("token");
      config.headers["token"] = token;

      return config;
    } catch(e) {
      console.error(e);
      return config;
    }
  }
);

// Response Interceptors
axios.interceptors.response.use(
  response => response,
  (err: AxiosError) => {
    if (err.response && ( err.response.status === HTTP_STATUS_CODES.UNAUTHORIZED )) {
      UserAction.fetchUserLogout();
    }
    return Promise.reject(err);
  }
);

export default axios;
