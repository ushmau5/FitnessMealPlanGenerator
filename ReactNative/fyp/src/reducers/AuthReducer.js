import {
  // Auth - LoginForm
  LOGIN_SUCCESS,
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_FAIL,
  SET_LOADING,
  CONFIRM_PASSWORD_CHANGED,
  SET_ERROR,
  SIGN_UP_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  username: 'oisin.mcnally',
  email: 'test@test.com',
  password: 'password',
  confirmPassword: '',
  user: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Auth - LoginForm
    case LOGIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmPassword: action.payload };
    case LOGIN_FAIL:
      return { ...state, error: 'Login Failed', loading: false };
    case SIGN_UP_FAIL:
      return { ...state, error: 'Sign Up Failed', loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
