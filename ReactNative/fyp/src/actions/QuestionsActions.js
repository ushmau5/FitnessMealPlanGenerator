import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  // QuestionForm
  UPDATE_QUESTION_FORM,
  SAVE_QUESTION_FORM,
  FETCH_QUESTION_FORM,
  FETCH_QUESTION_FORM_ERROR,
  QUESTION_FORM_SET_LOADING
} from './types';

  /******************
      QuestionForm
  ******************/
export const updateQuestionForm = ({ prop, value }) => {
  return {
    type: UPDATE_QUESTION_FORM,
    payload: { prop, value }
  };
};

export const saveQuestionForm = (val) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
  firebase.database().ref(`users/${currentUser.uid}/questionForm`)
  .set(val)
  .then(() => {
    dispatch({ type: SAVE_QUESTION_FORM });
    Actions.pop();
  });  // use backticks and es6 string injection
  };
};

export const fetchQuestionForm = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/questionForm`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: FETCH_QUESTION_FORM, payload: snapshot.val() });
      } else {
        dispatch({ type: FETCH_QUESTION_FORM_ERROR, payload: 'No previous information found...' });
      }
    });
  };
};

export const questionFormSetLoading = () => {
  return { type: QUESTION_FORM_SET_LOADING };
};
