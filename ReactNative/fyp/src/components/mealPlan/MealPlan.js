import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, LoadingOverlay } from '../common';
import ListOfMeals from './ListOfMeals';
import {
  fetchQuestionFormForMealPlan,
  fetchFoodPreferencesForMealPlan,
  fetchMealPlan,
  saveMealPlan,
  requestMealPlan,
  requestRandomMealPlan,
  fetchFavouritedMeals
} from '../../actions';

class MealList extends Component {

  componentWillMount() {
    this.props.fetchQuestionFormForMealPlan();
    this.props.fetchFoodPreferencesForMealPlan();
    this.props.fetchFavouritedMeals();
    this.props.fetchMealPlan();
  }

  onSavePress() {
    this.props.saveMealPlan(this.props.mealPlan);
  }

  requestMealPlan() {
    this.props.requestMealPlan(
      {
        numberOfMeals: this.props.numberOfMeals,
        calories: this.props.questionForm.goalCalories,
        foodPreferences: this.props.selectedFoodsArrays
      }
    );
  }

  requestRandomMealPlan() {
    this.props.requestRandomMealPlan(
      {
        numberOfMeals: this.props.numberOfMeals,
        calories: this.props.questionForm.goalCalories
      }
    );
  }

  openFavouritedMeals() {
    const { favouritedList } = this.props;
    Actions.ListOfMeals({ mealList: favouritedList, favouritedList, admin: true });
  }

  renderLoading() {
    if (this.props.loading) {
      return <LoadingOverlay />;
    }
  }

  renderError() {
    if (this.props.error.length > 1) {
      return (
        <CardSection>
        <Text style={styles.errorText}>
          {this.props.error}
        </Text>
        </CardSection>
      );
    }
  }

  render() {
    return (
      <View>
      <ScrollView>
        <ListOfMeals admin mealList={this.props.mealPlan} favouritedList={this.props.favouritedList} />
        <Card>
          {this.renderError()}
          <CardSection>
            <Button onPress={this.requestMealPlan.bind(this)}>Request Meal Plan</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.requestRandomMealPlan.bind(this)}>Request Random Meal Plan</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.openFavouritedMeals.bind(this)}>Favourited Meals</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onSavePress.bind(this)}>Save</Button>
          </CardSection>
        </Card>

      </ScrollView>
      {this.renderLoading()}
      </View>
    );
  }

}

const styles = {
  errorText: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 18
  }
};

const mapStateToProps = state => {
  return {
    numberOfMeals: state.mealPlan.numberOfMeals,
    selectedFoodsArrays: state.mealPlan.selectedFoodsArrays,
    questionForm: state.mealPlan.questionForm,
    mealPlan: state.mealPlan.mealPlan,
    error: state.mealPlan.error,
    loading: state.mealPlan.loading,
    favouritedList: state.mealPlan.favouritedList
  };
};

export default connect(mapStateToProps,
  {
    fetchQuestionFormForMealPlan,
    fetchFoodPreferencesForMealPlan,
    fetchMealPlan,
    saveMealPlan,
    requestMealPlan,
    requestRandomMealPlan,
    fetchFavouritedMeals
  })(MealList);
