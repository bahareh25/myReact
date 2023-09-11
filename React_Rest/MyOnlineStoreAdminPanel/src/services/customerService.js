import baseRequest, { setToken } from "./baseRequest";

export const customerServices = {
  //getAll: async data => baseRequest(data, "/customer", "get", true),
  getAll: async data => baseRequest(data, `/customer?page=${data.page}&itemCount=${data.itemCount}`, "get", true),
  get: async id => baseRequest(null, "/customer/" + id, "get", true),
  insert: async data => baseRequest(data, "/customer", "post", true),
  update: async (data,id) => baseRequest(data, "/customer/" + id, "put", true),
  delete: async id => baseRequest(null, "/customer/" + id, "delete", true),
}
