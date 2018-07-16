import {
  // QuestionForm
  UPDATE_QUESTION_FORM,
  SAVE_QUESTION_FORM,
  FETCH_QUESTION_FORM,
  FETCH_QUESTION_FORM_ERROR,
  QUESTION_FORM_SET_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  // QuestionForm
  questionForm: {
    gender: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    maintenanceCalories: '',
    goalCalories: '',
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // QuestionForm
    case UPDATE_QUESTION_FORM:
      return {
        ...state,
        questionForm: {
          ...state.questionForm,
          [action.payload.prop]: action.payload.value
        }
      };
      case SAVE_QUESTION_FORM:
        return { ...state, error: '', loading: false };
      case FETCH_QUESTION_FORM:
        return { ...state, questionForm: action.payload, loading: false };
      case FETCH_QUESTION_FORM_ERROR:
        return { ...state, error: action.payload, loading: false };
      case QUESTION_FORM_SET_LOADING:
        return { ...state, loading: true };

    // DEFAULT
    default:
      return state;
  }
};
