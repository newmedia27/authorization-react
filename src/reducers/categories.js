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
      // ТАК НЕ ДЕЛАТЬ!!!!
      // const response1 =  getCategories();
      // const response2 =  getCategories();
      // const response3 =  getCategories();

    const [r1,r2,r3] = await Promise.all([getCategories(),getCategories(),getCategories()])
      // console.log('response1 :>> ', response1);
      // console.log('response2 :>> ', response2);
      // console.log('response3 :>> ', response3);
      // dispatch(setCategories(data));
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
