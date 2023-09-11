import axios from 'axios'
import { authenticationServices } from './authenticationServices'
import { SERVER_ADDRESS } from 'src/constants/configs'
import { toastAnyWhere } from 'src/constants/functions'

const TIMEOUT_DELAY = 100000;

let token = localStorage.getItem("token") ?? undefined;

export const setToken = _token => {
  token = _token;
};

export default async function baseRequest(
  data,
  path,
  method,
  needAuthenticated,
  params,
  otherOptions,
  isFormData,
  absolutePath,
  getCancelToken,
  retry
) {
  let timeout = null;
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  getCancelToken && getCancelToken(source);
  timeout = setTimeout(() => {
    source.cancel();
  }, TIMEOUT_DELAY);
  const API = absolutePath ? "" : SERVER_ADDRESS;
  if (needAuthenticated && !token) return Promise.reject({ isTimeout: false, error: 401 });
  let formData = null;
  if (isFormData) {
    formData = new FormData();
    // Reflect.ownKeys(data).forEach(key => {
    //   if (data[key]) {
    //     formData.append(key, data[key]);
    //   }
    // });
  }
  const headers = needAuthenticated
    ? { "content-type": "application/json", "Authorization": "Bearer " + token }
    : { "content-type": "application/json" };
  try {
    const response = await axios({
      url: `${API}${path}`,
      method: method === "post" && data ? "POST" : method,
      headers: method === "get" && data ? { ...headers, "X-HTTP-Method-Override": method.toUpperCase() } : headers,
      cancelToken: source.token,
      data: isFormData ? formData : data,
      params,
      ...otherOptions
    });
    if (response.status >= 200 && response.status < 300) {
      if (timeout) clearTimeout(timeout);
      response.data.message && toastAnyWhere.show(response.data.message,response.data.isSuccess ? 'success':'error');
      return response.data;
    } else {
      if (timeout) clearTimeout(timeout);
      return Promise.reject({ isTimeout: false, error: 101 });
    }
  } catch (error) {
    if (timeout) clearTimeout(timeout);
    if (!axios.isCancel(error)){
      error.response.data.message && toastAnyWhere.show(error.response.data.message,'error');
      // if (error.response.status === 400) {
      //   await authenticationServices.logout();
      // }

      if (error.response.status === 401) {
        if(retry){
          await authenticationServices.logout();
        }
        const refreshTokenResult = await authenticationServices.loginWithToken();
        if(refreshTokenResult && refreshTokenResult.data)
        {
          localStorage.setItem("token", JSON.stringify(refreshTokenResult.data));
          token = refreshTokenResult.data.token;
        } else {
          await authenticationServices.logout();
        }

        return baseRequest(data, path, method, needAuthenticated, params, otherOptions, isFormData, null, null, true);
      }
    }
    return Promise.reject({
      isTimeout: axios.isCancel(error),
      response: error.response && error.response.data,
      status: error.response && error.response.status
    });
  }
}
