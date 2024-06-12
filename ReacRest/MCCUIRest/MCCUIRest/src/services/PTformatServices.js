import baseRequest, { setToken } from "./baseRequest";

export const ptFormatServices = {
  getPTFormat: async data => baseRequest(data, "/PTFormat", "get", true),
  //getWithProvinceId: async id => baseRequest(null, `/city/?provinceId=${id}`, "get", true)
}