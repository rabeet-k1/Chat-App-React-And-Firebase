import firebase from "../../firebaseConfig/firebaseConfig";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const signup = (user) => {
  return (dispatch) => {
    const db = firebase.firestore();

    dispatch({
      type: `${USER_LOGIN}_REQUEST`,
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const currentUser = firebase.auth().currentUser;
        const name = `${user.firstName} ${user.lastName}`;
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            // If you are here mean it is updated Successfully
            db.collection("users")
              .doc(data.user.uid)
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                // successful
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("User logged in successfully");
                dispatch({
                  type: `${USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((error) => {
                console.log(error);
                dispatch({
                  type: `${USER_LOGIN}_FAILURE`,
                  payload: { error },
                });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signin = (user) => {
  return (dispatch) => {
    dispatch({ type: `${USER_LOGIN}_REQUEST` });

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);

        firebase
          .firestore()
          .collection("users")
          .doc(data.user.uid)
          .update({ isOnline: true })
          .then(() => {
            const name = data.user.displayName.split(" ");
            const firstName = name[0];
            const lastName = name[1];

            const loggedInUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
            };

            localStorage.setItem("user", JSON.stringify(loggedInUser));
            dispatch({
              type: `${USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: `${USER_LOGIN}_FAILURE`, payload: { error } });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const isLoggedInUser = () => {
  return (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user) {
      dispatch({
        type: `${USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${USER_LOGIN}_FAILURE`,
        payload: { error: "Login Again Please" },
      });
    }
  };
};

export const logout = (uid) => {
  return (dispatch) => {
    dispatch({ type: `${USER_LOGOUT}_REQUEST` });

    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ isOnline: false })
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            // successfully
            localStorage.clear();
            dispatch({ type: `${USER_LOGOUT}_SUCCESS` });
          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: `${USER_LOGOUT}_FAILURE`, payload: { error } });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
