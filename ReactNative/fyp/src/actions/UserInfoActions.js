import firebase from 'firebase';
import axios from 'axios';
import {
  UI_SET_MEALPLAN,
  UI_SET_ERROR,
  UI_FETCH_QUESTION_FORM,
  UI_SET_LOADING
} from './types';

/**
 * Fetch the current meal plan stored in Firebase
 */
export const fetchMealPlanForUserInfo = (uid) => {
  return (dispatch) => {
    dispatch({ type: UI_SET_LOADING });
    firebase.database().ref(`users/${uid}/currentMealPlan`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: UI_SET_MEALPLAN, payload: snapshot.val() });
      } else {
        dispatch({ type: UI_SET_ERROR, payload: 'Firebase Error! No meal entries exists...' });
      }
    });
  };
};

export const fetchQuestionFormForUserInfo = (uid) => {
  return (dispatch) => {
    dispatch({ type: UI_SET_LOADING });
    firebase.database().ref(`users/${uid}/questionForm`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: UI_FETCH_QUESTION_FORM, payload: snapshot.val() });
      } else {
        dispatch({ type: UI_SET_ERROR, payload: 'No previous information found...' });
      }
    });
  };
};
