import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QuestionsReducer from './QuestionsReducer';
import FoodPreferencesReducer from './FoodPreferencesReducer';
import MealPlanReducer from './MealPlanReducer';
import WeightStatsReducer from './WeightStatsReducer';
import GroupManagerReducer from './GroupManagerReducer';
import UserInfoReducer from './UserInfoReducer';

export default combineReducers({
  auth: AuthReducer,
  questions: QuestionsReducer,
  foodPreferences: FoodPreferencesReducer,
  mealPlan: MealPlanReducer,
  weightStats: WeightStatsReducer,
  groupManager: GroupManagerReducer,
  userInfo: UserInfoReducer
});
