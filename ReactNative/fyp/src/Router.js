import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import LoginForm from './components/login/LoginForm';
import SignUpForm from './components/login/SignUpForm';
import QuestionForm from './components/questions/QuestionForm';
import FoodPreferenceList from './components/foodPreferences/FoodPreferenceList';
import AddFoodList from './components/foodPreferences/AddFoodList';
import DeleteFoodList from './components/foodPreferences/DeleteFoodList';
import MainMenu from './components/mainMenu/MainMenu';
import MealPlan from './components/mealPlan/MealPlan';
import ListOfMeals from './components/mealPlan/ListOfMeals';
import EditMeal from './components/mealPlan/EditMeal';
import WeightStats from './components/weightStats/WeightStats';
import GroupManager from './components/groupManager/GroupManager';
import UserInfo from './components/groupManager/UserInfo';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
          <Scene key="LoginForm" component={LoginForm} hideNavBar />
          <Scene key="SignUpForm" component={SignUpForm} hideNavBar />
          <Scene key="MainMenu" component={MainMenu} title="Main Menu" hideNavBar />
          <Scene key="QuestionForm" component={QuestionForm} title="Calculate Calories" />
          <Scene key="FoodPreferenceList" component={FoodPreferenceList} title="Food Preferences" />
          <Scene key="AddFoodList" component={AddFoodList} title="Add Food List" />
          <Scene key="DeleteFoodList" component={DeleteFoodList} title="Delete Food List" />
          <Scene key="MealPlan" component={MealPlan} title="Meal Plan" />
          <Scene key="ListOfMeals" component={ListOfMeals} />
          <Scene key="EditMeal" component={EditMeal} title="Edit Meal" />
          <Scene key="WeightStats" component={WeightStats} title="Weight Statistics" />
          <Scene key="GroupManager" component={GroupManager} title="Group Manager" />
          <Scene key="UserInfo" component={UserInfo} title="User Info" />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
