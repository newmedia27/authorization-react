import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getCategoriesRequest = async (categoryName) => {
  const { data } = await axios.get(`${BASE_URL}/${categoryName}`);
  return data;
};
