import baseRequest, { setToken } from "./baseRequest";

export const ptypecodeServices = {
  getPtypeCode: async data => baseRequest(data, "/PTypeCode", "get", true),
  //getWithProvinceId: async id => baseRequest(null, `/city/?provinceId=${id}`, "get", true)
}
