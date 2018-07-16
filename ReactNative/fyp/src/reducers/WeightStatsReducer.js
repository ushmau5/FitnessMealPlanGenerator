import {
  FETCH_ALL_WEIGHTS,
  WEIGHSTATS_SET_ERROR,
  SET_MODAL_WEIGHT,
  RESET_MODAL_WEIGHT,
  UPDATE_PICKER_METRIC,
  UPDATE_DISPLAY_TIMEFRAME,
  WS_START_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  allWeights: {},
  modalWeight: '',
  metric: 'kg',
  timeframe: 'alltime',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_ALL_WEIGHTS:
    return { ...state, allWeights: action.payload, loading: false };
  case WEIGHSTATS_SET_ERROR:
    return { ...state, error: action.payload, loading: false };
  case SET_MODAL_WEIGHT:
    return { ...state, modalWeight: action.payload, loading: false };
  case RESET_MODAL_WEIGHT:
    return { ...state, modalWeight: '', loading: false };
  case UPDATE_PICKER_METRIC:
    return { ...state, metric: action.payload, loading: false };
  case UPDATE_DISPLAY_TIMEFRAME:
    return { ...state, timeframe: action.payload, loading: false };
  case WS_START_LOADING:
    return { ...state, loading: true };
  default:
    return state;
  }
};
