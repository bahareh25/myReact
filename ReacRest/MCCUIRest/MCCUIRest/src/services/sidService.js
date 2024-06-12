import baseRequest, { setToken } from "./baseRequest";

export const sidServices = {
  //getAll: async data => baseRequest(data, "/sid", "get", true),
   getAll: async data => baseRequest(data, `/sid?page=${data.page}&itemCount=${data.itemCount}`, "get", true),
   get: async id => baseRequest(null, "/sid/" + id, "get", true),
   insert: async data => baseRequest(data, "/SID/InsertSid", "post", true),
   update: async (data) => baseRequest(data, "/SID/UpdateSid" , "post", true), //(data,id)
   delete: async id => baseRequest(null, "/SID/DeletePid/" + id, "delete", true),
}
