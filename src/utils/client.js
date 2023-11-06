import axios from "axios";
import config from "../config";

const { apiBaseUrl } = config || {};

export async function client(url, { body, method, ...customConfig } = {}) {
  // const accessToken = localStorageHelper("accessToken");
  // const userToken = localStorageHelper("userToken");

  // let headers = { Accept: "*/*" };

  // if (token == "admin") headers.Authorization = `Bearer ${accessToken}`;
  // if (token == "user") headers.Authorization = `Bearer ${userToken}`;

  const config = {
    url,
    method,
    baseURL: apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: method === "GET" ? null : body,
  };
  let data;

  try {
    const response = await axios(config);
    data = await response.data;
    const { status, ...restData } = data || {};
    if (response.status === 200) {
      if (data?.status === "success")
        return {
          status: true,
          data: restData,
        };
    }
    return {
      status: false,
      data: restData,
      message: data?.status,
    };
  } catch (err) {
    return {
      status: false,
      data: err.data || null,
      message: err?.message,
      error: err,
    };
  }
}

client.get = function (url, customConfig = {}) {
  return client(url, { ...customConfig, method: "GET" });
};

client.post = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, method: "POST", body });
};

client.put = function (url, body, customConfig = {}) {
  return client(url, { ...customConfig, method: "PUT", body });
};

client.delete = function (url, customConfig = {}) {
  return client(url, { ...customConfig, method: "DELETE" });
};
