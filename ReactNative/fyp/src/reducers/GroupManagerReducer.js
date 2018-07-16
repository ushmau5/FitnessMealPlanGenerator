import {
  GM_SET_USERS,
  GM_SET_ERROR,
  GM_SET_SUCCESS,
  GM_UPDATE_ENTERED_UID,
  GM_SET_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  users: {},
  enteredUid: '',
  error: '',
  success: '',
  loading: false,
  questionForm: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GM_SET_USERS:
      return { ...state, users: action.payload, loading: false };
    case GM_SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case GM_SET_SUCCESS:
      return { ...state, success: action.payload, error: '', loading: false };
    case GM_UPDATE_ENTERED_UID:
      return { ...state, enteredUid: action.payload, loading: false };
    case GM_SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
