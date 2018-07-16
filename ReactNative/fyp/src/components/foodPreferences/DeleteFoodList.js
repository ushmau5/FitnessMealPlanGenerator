import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Card, CardSection, Button } from '../common';
import { updateFoodPreferences } from '../../actions';

class DeleteFoodList extends Component {

  deleteSelectedFood(food) {
    const mealNumber = this.props.mealNumber;
    const selectedFoodsContainer = { ...this.props.selectedFoodsArrays };

    delete selectedFoodsContainer[mealNumber][food.id]; // eg object['1'][CHEESE-1] delete cheese from meal with key 1
    this.props.updateFoodPreferences(selectedFoodsContainer);
}

  renderFoods() {
    const mealNumber = this.props.mealNumber;
    const selectedFoodsContainer = { ...this.props.selectedFoodsArrays };
    const mealFoods = selectedFoodsContainer[mealNumber];

    if (typeof mealFoods !== undefined
  && mealFoods !== null) {
      return (
          Object.values(mealFoods).map(food =>
          <CardSection key={food.id}>
            <Button onPress={this.deleteSelectedFood.bind(this, food)}>{food.name}</Button>
          </CardSection>
        )
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <Card>
          {this.renderFoods()}
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedFoodsArrays: state.foodPreferences.selectedFoodsArrays,
    error: state.foodPreferences.error,
    loading: state.foodPreferences.loading
  };
};

export default connect(mapStateToProps, { updateFoodPreferences })(DeleteFoodList);
