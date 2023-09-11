import baseRequest, { setToken } from "./baseRequest";

export const cityServices = {
  getProvinces: async data => baseRequest(data, "/city/provinces", "get", true),
  getWithProvinceId: async id => baseRequest(null, `/city/?provinceId=${id}`, "get", true)
}
