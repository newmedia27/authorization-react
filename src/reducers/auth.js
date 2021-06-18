import { handleActions, createAction } from "redux-actions";
import { login, register } from "../services/api";

const namespace = `auth`;

const REGISTRATION = `${namespace}/REGISTRATION`;
const IS_LOAD = `${namespace}/IS_LOAD`;
const SET_TOKEN = `${namespace}/SET_TOKEN`;

export const RESET_AUTH = `${namespace}/RESET_AUTH`

export const sendRegistration = createAction(REGISTRATION);
export const isLoad = createAction(IS_LOAD);

export const setToken = createAction(SET_TOKEN);

const initialState = {
  isLoad: false,
  error: null,

  token: null,
  authorization: false,
};

export default handleActions(
  {
    [IS_LOAD]: (state, { payload }) => ({ ...state, isLoad: payload }),
    [SET_TOKEN]: (state, { payload }) => ({
      ...state,
      token: payload,
      authorization: !!payload,
    }),
    [RESET_AUTH]: ()=>initialState
  },
  initialState
);

export const authorizationSelector = state=>state[namespace].authorization

export function sendRegisrationRequest(values) {
  return async (dispatch) => {
    dispatch(isLoad(true));
    try {
      const {
        data: { jwt },
      } = await register(values);
      dispatch(setToken(jwt));
      toLS(jwt);
    } catch (err) {
    } finally {
      dispatch(isLoad(false));
    }
  };
}
export function sendLoginRequest(values) {
  return async (dispatch) => {
    dispatch(isLoad(true));
    try {
      const {
        data: { jwt },
      } = await login(values);
      dispatch(setToken(jwt));
      toLS(jwt);
    } catch (err) {
    } finally {
      dispatch(isLoad(false));
    }
  };
}

function toLS(jwt) {
  localStorage.setItem("token", jwt);
}

export function init(store) {
  const token = localStorage.getItem("token");
  if (token && setToken) {
    store.dispatch(setToken(token));
  }

  return store;
}

export function logout(){
  return dispatch=>{
    localStorage.removeItem("token")
    dispatch({
      type: RESET_AUTH
    })
  }
}
