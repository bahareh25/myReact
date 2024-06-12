import baseRequest, { setToken } from './baseRequest'

export const authenticationServices = {
  register: async data => baseRequest(data, "/user", "post"),
  login: async data => {
    const res = await baseRequest(data, "/authenticate", "post");
    setToken(res.token);
    localStorage.setItem("token", res.token);
    localStorage.setItem("refresh-token", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res));
    return res;
  },
  logout: async data => {
    localStorage.clear();
    window.location.reload();
  },
  loginWithToken: async () => {
    const data = { token: `${localStorage.getItem("token")}`, refreshToken: localStorage.getItem("refresh-token") };
    const res = await baseRequest(data, "/authenticate/NewToken", "post");
    if (res.isSuccess) {
      setToken(res.token);
      localStorage.setItem("token", res.token);
      localStorage.setItem("refresh-token", res.refreshToken);
      return res;
    }
    return null;
  },
  isAuthenticate: () => localStorage.getItem("token") ? true : false,
  tempUser: () => { return { imageUrl: '', jobTitle: '', fullName: '' } },
  userInfo: async () => localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { imageUrl: '', jobTitle: '', fullName: '' },
};
