import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING,
  CONFIRM_PASSWORD_CHANGED,
  SET_ERROR,
  SIGN_UP_FAIL
} from './types';

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const confirmPasswordChanged = (text) => {
  return {
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
};

export const setError = (text) => {
  return {
    type: SET_ERROR,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING });

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      loginSuccess(dispatch, user);
    }).catch(() => loginFail(dispatch));
  };
};

export const signUpUser = ({ username, email, password }) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        loginSuccess(dispatch, user);
        firebase.database().ref(`users/${user.uid}/username`)
        .set(username);
        firebase.database().ref(`users/${user.uid}/uid`)
        .set(user.uid);
      }).catch(() => signUpFail(dispatch));
  };
};

const loginSuccess = (dispatch, user) => {
  Actions.MainMenu();
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user
  });
};

const loginFail = (dispatch) => {
  dispatch({
    type: LOGIN_FAIL
  });
};

const signUpFail = (dispatch) => {
  dispatch({
    type: SIGN_UP_FAIL
  });
};
