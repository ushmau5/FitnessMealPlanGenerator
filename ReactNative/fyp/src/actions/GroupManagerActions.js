import firebase from 'firebase';
import {
  GM_SET_USERS,
  GM_SET_ERROR,
  GM_SET_SUCCESS,
  GM_UPDATE_ENTERED_UID,
  GM_SET_LOADING
} from './types';


export const fetchUsers = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: GM_SET_LOADING });
    firebase.database().ref(`users/${currentUser.uid}/group/users`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: GM_SET_USERS, payload: snapshot.val() });
      } else {
        dispatch({ type: GM_SET_ERROR, payload: 'Firebase Error! No entry exists...' });
      }
    });
  };
};

export const addUser = (enteredUid) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
  dispatch({ type: GM_SET_LOADING });
  firebase.database().ref(`users/${enteredUid}`)
  .on('value', snapshot => {
    const user = snapshot.val();
    if (user !== null) {
      firebase.database().ref(`users/${currentUser.uid}/group/users/${enteredUid}`)
      .set({ uid: user.uid, username: user.username, gender: user.questionForm.gender, age: user.questionForm.age })
      .then(() => {
        dispatch({ type: GM_SET_SUCCESS, payload: `User ${user.username} added successfuly!` });
      }
    );
  } else {
    dispatch({ type: GM_SET_ERROR, payload: `User ${enteredUid} does not exist!` });
  }
  });
};
};

export const updateEnteredUid = (text) => {
  return {
    type: GM_UPDATE_ENTERED_UID,
    payload: text
  };
};
