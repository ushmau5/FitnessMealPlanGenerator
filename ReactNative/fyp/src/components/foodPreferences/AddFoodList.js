import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Card, CardSection, Button, LoadingOverlay } from '../common';
import { updateFoodPreferences, requestFoods } from '../../actions';
//import mealFoods from '../../../foods.json'; offline testing

class AddFoodList extends Component {

  componentWillMount() {
    this.props.requestFoods();
  }

  updateSelectedFoods(food) {
  const mealNumber = this.props.mealNumber;
  const selectedFoodsContainer = { ...this.props.selectedFoodsArrays }; // make a clone of object
// NOTE: if line adove was just directly equal, that would be mutating the state.. very important! comeponent would NOT re-render!
// If there is preferences for only 1 meal in the array,
// Lets say we want to add preferences for meal 2,
// A new array entry must be created and pushed to the original array
// Else undefined array entry errors as we're trying to reference an array that doesnt exist
  if ((Object.keys(selectedFoodsContainer)).length < mealNumber) {
    const selectedFoods = {};
    selectedFoods[food.id] = food;
    selectedFoodsContainer[mealNumber] = selectedFoods;
  } else {
    selectedFoodsContainer[mealNumber][food.id] = food;
  }
    this.props.updateFoodPreferences(selectedFoodsContainer);
}

  renderFoods() {
    return (
        Object.values(this.props.foods).map(food =>
        <CardSection>
          <Button onPress={this.updateSelectedFoods.bind(this, food)}>{food.name}</Button>
        </CardSection>
      )
    );
  }

  renderLoading() {
    if (this.props.loading) {
      return <LoadingOverlay />;
    }
  }

  render() {
    return (
      <View>
      <ScrollView>
        <Card>
          {this.renderFoods()}
        </Card>
      </ScrollView>
      {this.renderLoading()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedFoodsArrays: state.foodPreferences.selectedFoodsArrays,
    foods: state.foodPreferences.foods,
    error: state.foodPreferences.error,
    loading: state.foodPreferences.loading
  };
};

export default connect(mapStateToProps, { updateFoodPreferences, requestFoods })(AddFoodList);
