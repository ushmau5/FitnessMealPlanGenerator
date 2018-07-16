import {
  UI_SET_MEALPLAN,
  UI_SET_ERROR,
  UI_FETCH_QUESTION_FORM,
  UI_SET_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  mealPlan: {},
  questionForm: {},
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UI_SET_MEALPLAN:
      return { ...state, mealPlan: action.payload, loading: false };
    case UI_SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case UI_FETCH_QUESTION_FORM:
      return { ...state, questionForm: action.payload, loading: false };
    case UI_SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
