import {
  GET_REALTIME_MESSAGES,
  GET_REALTIME_USERS,
} from "../actions/userActions";

const inititalState = {
  users: [],
  conversations: [],
};

const userReducer = (state = inititalState, action) => {
  switch (action.type) {
    case `${GET_REALTIME_USERS}_REQUEST`:
      state = { ...state };
      return state;

    case `${GET_REALTIME_USERS}_SUCCESS`:
      state = {
        ...state,
        users: action.payload.users,
      };
      return state;

    case GET_REALTIME_MESSAGES:
      state = {
        ...state,
        conversations: action.payload.conversations,
      };
      return state;

    default:
      return state;
  }
};

export default userReducer;
