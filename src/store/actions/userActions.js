import firebase from "../../firebaseConfig/firebaseConfig";

export const GET_REALTIME_USERS = "GET_REALTIME_USERS";
export const GET_REALTIME_MESSAGES = "GET_REALTIME_MESSAGES";

export const getRealTimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${GET_REALTIME_USERS}_REQUEST` });

    const unsubscribe = firebase
      .firestore()
      .collection("users")
      //   .where("uid", "!=", uid)
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().uid !== uid) {
            users.push(doc.data());
          }
        });
        dispatch({ type: `${GET_REALTIME_USERS}_SUCCESS`, payload: { users } });
      });
    return unsubscribe;
  };
};

export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("conversations")
      .add({ ...msgObj, isView: false, createdAt: new Date() })
      .then((data) => {
        console.log(data);
        // success
        // dispatch({ type: `${GET_REALTIME_USERS}_SUCCESS` });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRealTimeConversations = (user) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === user.uid_1 &&
              doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 &&
              doc.data().user_uid_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
          }
          if (conversations.length > 0) {
            dispatch({
              type: GET_REALTIME_MESSAGES,
              payload: { conversations },
            });
          } else {
            dispatch({
              type: `${GET_REALTIME_MESSAGES}_FAILURE`,
              payload: { conversations },
            });
          }
        });
        console.log(conversations);
      });
  };
};
