import firebase from 'firebase';
import {
  FETCH_ALL_WEIGHTS,
  WEIGHSTATS_SET_ERROR,
  SET_MODAL_WEIGHT,
  RESET_MODAL_WEIGHT,
  UPDATE_PICKER_METRIC,
  UPDATE_DISPLAY_TIMEFRAME,
  WS_START_LOADING
} from './types';

export const fetchAllWeights = (enteredUid) => {
  const { currentUser } = firebase.auth();
  let uid = currentUser.uid;
  if (enteredUid !== undefined) {
    uid = enteredUid;
  }

  return (dispatch) => {
    dispatch({ type: WS_START_LOADING });
    firebase.database().ref(`users/${uid}/weight`)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        dispatch({ type: FETCH_ALL_WEIGHTS, payload: snapshot.val() });
      } else {
        dispatch({ type: WEIGHSTATS_SET_ERROR, payload: 'Firebase Error! No entry exists...' });
      }
    });
  };
};

export const setModalWeight = (val) => {
  const regex = new RegExp('^[0-9]*$'); // allow one or more digits
  return (dispatch) => {
    if (regex.test(val)) {
      dispatch({ type: SET_MODAL_WEIGHT, payload: val });
    }
  };
};

export const pushModalWeightToFirebase = ({ dateKey, obj }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
  dispatch({ type: WS_START_LOADING });
  firebase.database().ref(`users/${currentUser.uid}/weight/${dateKey}`)
  .set(obj)
  .then(() => {
    dispatch({ type: RESET_MODAL_WEIGHT });
  });
  };
};

export const updatePickerMetric = (val) => {
  return {
    type: UPDATE_PICKER_METRIC,
    payload: val
  };
};

export const updateDisplayTimeframe = (val) => {
  return {
    type: UPDATE_DISPLAY_TIMEFRAME,
    payload: val
  };
};
