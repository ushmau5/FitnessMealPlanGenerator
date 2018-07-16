import {
  MP_FETCH_QUESTION_FORM,
  MP_FETCH_FOOD_PREFERENCES,
  MP_START_LOADING,
  MP_STOP_LOADING,
  MP_SET_ERROR,
  MP_SET_MEAL_PLAN,
  MP_SAVE_MEAL_PLAN,
  MP_SET_FAVOURITED_MEALS
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  selectedFoodsArrays: {},
  numberOfMeals: '1',
  questionForm: {
    gender: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    maintenanceCalories: '',
    goalCalories: '',
  },
  mealPlan: {},
  favouritedList: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MP_FETCH_QUESTION_FORM:
      return { ...state, questionForm: action.payload, loading: false };
    case MP_FETCH_FOOD_PREFERENCES:
      return { ...state, selectedFoodsArrays: action.payload, numberOfMeals: action.payload.length, loading: false };
    case MP_SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case MP_START_LOADING:
      return { ...state, loading: true };
    case MP_STOP_LOADING:
      return { ...state, loading: false };
    case MP_SET_MEAL_PLAN:
      return { ...state, mealPlan: action.payload, error: '', loading: false };
    case MP_SET_FAVOURITED_MEALS:
      return { ...state, favouritedList: action.payload, error: '', loading: false };
    case MP_SAVE_MEAL_PLAN:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
