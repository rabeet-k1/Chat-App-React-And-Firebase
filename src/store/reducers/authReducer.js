import { USER_LOGIN, USER_LOGOUT } from "./../actions/authActions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case `${USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      };
      return state;

    case `${USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      return state;

    case `${USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      return state;

    case `${USER_LOGOUT}_REQUEST`:
      state = { ...state };
      return state;
    case `${USER_LOGOUT}_SUCCESS`:
      state = {
        ...state,
      };
      return state;
    case `${USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      return state;

    default:
      return state;
  }
};

export default authReducer;
