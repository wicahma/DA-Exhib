import * as actions from "./handleApiActions";

export const initialState = {
  loading: false,
  hasErrors: false,
  dataAPI: [],
  dataUser: {
    _id: null,
    username: null,
    email: null,
    token: null,
  },
  validate: false,
};

export default function handleApiReducers(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DATA:
      return { ...state, loading: true };
    case actions.GET_DATA_SUCCES:
      return {
        ...state,
        dataAPI: action.payload,
        loading: false,
        hasErrors: false,
      };
    case actions.GET_DATA_FAIL:
      return { ...state, loading: false, hasErrors: true };
    case "SET_USER":
      return { ...state, dataUser: action.payload, validate: true };
    case "USER_LOGOUT":
      return {
        ...state,
        dataUser: {
          _id: null,
          username: null,
          email: null,
          token: null,
        },
        validate: false,
        loading: false,
        hasErrors: false,
      };
    default:
      return state;
  }
}
