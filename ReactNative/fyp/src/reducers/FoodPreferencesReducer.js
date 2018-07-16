import {
  // FoodPreferenceList
  UPDATE_FOOD_PREFERENCE,
  UPDATE_NUMBER_OF_MEALS,
  SAVE_FOOD_PREFERENCES,
  FETCH_FOOD_PREFERENCES,
  FETCH_FOOD_PREFERENCES_ERROR,
  FOOD_PREFERENCES_SET_LOADING,
  FETCH_FOODS_DB
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false,
  selectedFoodsArrays: {},
  numberOfMeals: '1',
  foods: {} // Store foods from database in json
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // FoodPreferenceList
    case UPDATE_FOOD_PREFERENCE:
      return { ...state, selectedFoodsArrays: action.payload };
    case UPDATE_NUMBER_OF_MEALS:
      return { ...state, numberOfMeals: action.payload };
    case SAVE_FOOD_PREFERENCES:
      return { ...state, error: '', loading: false };
    case FETCH_FOOD_PREFERENCES:
      return { ...state, selectedFoodsArrays: action.payload, numberOfMeals: Object.keys(action.payload).length, loading: false };
    case FETCH_FOOD_PREFERENCES_ERROR:
      return { ...state, error: action.payload, loading: false };
    case FOOD_PREFERENCES_SET_LOADING:
      return { ...state, loading: true };
    case FETCH_FOODS_DB:
      return { ...state, foods: action.payload, loading: false };

    // DEFAULT
    default:
      return state;
  }
};
