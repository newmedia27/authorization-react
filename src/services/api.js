import { isPast, format } from "date-fns";
import axios from "axios";
import { logout } from "../reducers/auth";
import {store}  from "../";
//// ТАК
const applyLogout = (store) => {
  if (store) {
    const { dispatch } = store;
    dispatch(logout());
  }
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

function validateToken(token) {
  if (typeof token !== "string") {
    return false;
  }
  const prepareToken = token.split(".")[1] || undefined;
  if (!prepareToken) {
    return false;
  }
  const { exp } = JSON.parse(atob(prepareToken));
  if (!exp) {
    return false;
  }
  const expirion = Math.abs(exp * 1000);
  const result = isPast(new Date(expirion));
  return !result;
}

const request = async (url, method, data, options) => {
  const token = localStorage.getItem("token");
  const valid = validateToken(token);
  if (valid) {
   return applyLogout(store);
  }
  setAutorizationToken(instance, token);
  try {
    const response = await instance[method](url, data, options);
    if (response.status >= 400) {
      throw response.data && response.data.error;
    }
    return response;
  } catch (err) {
    throw err;
  }
};
export function setAutorizationToken(instance, token) {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Autorization;
  }
}

export const resource = {
  get: async (url, data = null, options = null) =>
    await request(url, "get", data, options),

  post: async (url, data = null, options = null) =>
    await request(url, "post", data, options),

  put: async (url, data = null, options = null) =>
    await request(url, "put", data, options),

  delete: async (url, data = null, options = null) =>
    await request(url, "delete", data, options),
};

///////////////////////
export const register = async (values) =>
  await axios.post(`${BASE_URL}/auth/local/register`, values);

export const login = async (values) =>
  await axios.post(`${BASE_URL}/auth/local`, values);

// export const getCategories = async () =>
//   await axios.get(`${BASE_URL}/categories`);

export const getCategories = async () => await resource.get("/categories");
export const createCategory = async (values) =>
  await resource.post("/categories", values);
