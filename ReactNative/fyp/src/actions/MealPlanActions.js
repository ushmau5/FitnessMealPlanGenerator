import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Config from '../Config';
import {
  MP_FETCH_QUESTION_FORM,
  MP_FETCH_FOOD_PREFERENCES,
  MP_START_LOADING,
  MP_STOP_LOADING,
  MP_SET_ERROR,
  MP_SET_MEAL_PLAN,
  MP_SAVE_MEAL_PLAN,
  MP_SET_FAVOURITED_MEALS
} from './types';

/**
 * Fetch question form from Firebase
 * NOTE: Needed for meal plan API request
 */
export const fetchQuestionFormForMealPlan = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: MP_START_LOADING });
    firebase.database().ref(`users/${currentUser.uid}/questionForm`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: MP_FETCH_QUESTION_FORM, payload: snapshot.val() });
      } else {
        dispatch({ type: MP_SET_ERROR, payload: 'Firebase Error! No entry exists...' });
      }
    });
  };
};

/**
 * Fetch food preferences from Firebase
 * NOTE: Needed for meal plan API request
 */
export const fetchFoodPreferencesForMealPlan = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: MP_START_LOADING });
    firebase.database().ref(`users/${currentUser.uid}/foodPreferences`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: MP_FETCH_FOOD_PREFERENCES, payload: snapshot.val() });
      } else {
        dispatch({ type: MP_SET_ERROR, payload: 'Firebase Error! No entry exists...' });
      }
    });
  };
};

/**
 * Fetch the current meal plan stored in Firebase
 */
export const fetchMealPlan = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: MP_START_LOADING });
    firebase.database().ref(`users/${currentUser.uid}/currentMealPlan`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: MP_SET_MEAL_PLAN, payload: snapshot.val() });
      } else {
        dispatch({ type: MP_SET_ERROR, payload: 'Firebase Error! No entry exists...' });
      }
    });
  };
};

/**
 * Save the meal plan stored in state to Firebase
 */
export const saveMealPlan = (val) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
  dispatch({ type: MP_START_LOADING });
  firebase.database().ref(`users/${currentUser.uid}/currentMealPlan`)
  .set(val)
  .then(() => {
    dispatch({ type: MP_SAVE_MEAL_PLAN });
    Actions.pop();
    });
  };
};

/**
 * Make an API request for a meal plan
 * Must have port forwarding set up on chrome if web service is on localhost
 */
export const requestMealPlan = ({ numberOfMeals, calories, foodPreferences }) => {
  return (dispatch) => {
  dispatch({ type: MP_START_LOADING });
  axios.post(`${Config.BASE_URL}/mealplan/${calories}/${numberOfMeals}`, foodPreferences)
  .then(response => {
    dispatch({ type: MP_SET_MEAL_PLAN, payload: response.data.mealPlan });
  })
  .catch(error => {
    console.log(error);
    dispatch({ type: MP_SET_ERROR, payload: 'API Error! Could not complete request...' });
  });
};
};

/**
 * Make an API request for a random meal plan
 * Must have port forwarding set up on chrome if web service is on localhost
 */
export const requestRandomMealPlan = ({ numberOfMeals, calories }) => {
  return (dispatch) => {
  dispatch({ type: MP_START_LOADING });
  axios.get(`${Config.BASE_URL}/mealplan/random/${calories}/${numberOfMeals}`)
  .then(response => {
    dispatch({ type: MP_SET_MEAL_PLAN, payload: response.data.mealPlan });
  })
  .catch(error => {
    console.log(error);
    dispatch({ type: MP_SET_ERROR, payload: 'API Error! Could not complete request...' });
  });
};
};

export const fetchFavouritedMeals = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: MP_START_LOADING });
    firebase.database().ref(`users/${currentUser.uid}/favouritedMeals`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: MP_SET_FAVOURITED_MEALS, payload: snapshot.val() });
      }
    });
  };
};

export const setMealPlan = (editedPlan) => {
  return { type: MP_SET_MEAL_PLAN, payload: editedPlan };
};

export const startLoading = () => {
  return { type: MP_START_LOADING };
};

export const stopLoading = () => {
  return { type: MP_STOP_LOADING };
};
