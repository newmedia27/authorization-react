import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const register = async (values) =>
  await axios.post(`${BASE_URL}/auth/local/register`, values);
