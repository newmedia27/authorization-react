import { handleActions, createAction } from "redux-actions";
import { register } from "../services/api";

const namespace = `auth`;

const REGISTRATION = `${namespace}/REGISTRATION`;
const IS_LOAD = `${namespace}/IS_LOAD`;

export const sendRegistration = createAction(REGISTRATION);
export const isLoad = createAction(IS_LOAD);

const initialState = {
  isLoad: false,
  error: null,

  token: null,
  authorization: false,
};

export default handleActions(
  {
    [IS_LOAD]: (state, { payload }) => ({ ...state, isLoad: payload }),
  },
  initialState
);

export function sendRegisrationRequest(values) {
  return async (dispatch) => {
    dispatch(isLoad(true));
    try {
      const response = await register(values);
      console.log(response, "RESPONSE");
    } catch (err) {
    } finally {
      dispatch(isLoad(false));
    }
  };
}
