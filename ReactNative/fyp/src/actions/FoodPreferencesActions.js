import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Config from '../Config';
import {
  // FoodPreferenceList
  UPDATE_FOOD_PREFERENCE,
  UPDATE_NUMBER_OF_MEALS,
  SAVE_FOOD_PREFERENCES,
  FETCH_FOOD_PREFERENCES,
  FETCH_FOOD_PREFERENCES_ERROR,
  FOOD_PREFERENCES_SET_LOADING,
  FETCH_FOODS_DB
} from './types';

/******************
FoodPreferenceList
******************/
export const updateFoodPreferences = (array) => {
  Actions.pop();
  return {
    type: UPDATE_FOOD_PREFERENCE,
    payload: array
  };
};

export const updateNumberOfMeals = (val) => {
  return {
    type: UPDATE_NUMBER_OF_MEALS,
    payload: val
  };
};

export const saveFoodPreferences = (val) => {
  // prop = number of numberOfMeals
  // value = JS object with prefs for each meal, key is meal number.
  const { currentUser } = firebase.auth();
  return (dispatch) => {
  firebase.database().ref(`users/${currentUser.uid}/foodPreferences`)
  .set(val)
  .then(() => {
    dispatch({ type: SAVE_FOOD_PREFERENCES });
    Actions.pop();
  });
  };
};

export const fetchFoodPreferences = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: FOOD_PREFERENCES_SET_LOADING });
    firebase.database().ref(`users/${currentUser.uid}/foodPreferences`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: FETCH_FOOD_PREFERENCES, payload: snapshot.val() });
      } else {
        dispatch({ type: FETCH_FOOD_PREFERENCES_ERROR, payload: 'Firebase Error! No entry exists...' });
      }
    });
  };
};

export const foodPreferencesSetLoading = () => {
  return { type: FOOD_PREFERENCES_SET_LOADING };
};

/**
 * Make an API request for all food objects from database
 * Must have port forwarding set up on chrome if web service is on localhost
 */
export const requestFoods = () => {
  return (dispatch) => {
  dispatch({ type: FOOD_PREFERENCES_SET_LOADING });
  axios.get(`${Config.BASE_URL}/foods/all`)
  .then(response => {
    console.log(response);
    dispatch({ type: FETCH_FOODS_DB, payload: response.data });
  })
  .catch(error => {
    console.log(error);
    dispatch({ type: FETCH_FOOD_PREFERENCES_ERROR, payload: 'API Error! Could not complete request...' });
  });
};
};
