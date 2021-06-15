import { createAction, handleActions } from "redux-actions";
import { getCategories, createCategory } from "../services/api";

const namespace = `categories`;

const SET_CATEGORIES = `${namespace}/SET_CATEGORIES`;

export const setCategories = createAction(SET_CATEGORIES);

const initialState = [];

export default handleActions(
  {
    [SET_CATEGORIES]: (state, { payload }) => payload,
  },
  initialState
);

export const categoriesSelector = (state) => state[namespace];

export function getCategoriesRequest() {
  return async (dispatch) => {
    try {
      const { data } = await getCategories();
      dispatch(setCategories(data));
    } catch (err) {
      console.log(err);
    }
  };
}
export function createCategoriesRequest(values) {
  return async (dispatch) => {
    try {
      const { data } = await createCategory(values);
      console.log(data, "DATA");
      dispatch(getCategoriesRequest());
    } catch (err) {
      console.log(err);
    }
  };
}
