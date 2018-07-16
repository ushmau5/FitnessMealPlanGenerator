import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, CardSection, Button } from '../common';
import { updateFoodPreferences } from '../../actions';

class FoodDetail extends Component {
  state = { mealNumber: this.props.mealNumber };

  openAddFoodList() {
    // Open screen with the list of foods that can be added
    Actions.AddFoodList({ mealNumber: this.props.mealNumber });
  }

  openDeleteFoodList() {
    // Open screen with the list of foods that can be deleted
    Actions.DeleteFoodList({ mealNumber: this.props.mealNumber });
  }

  renderSelectedFoodsList(selectedFoods) {
    // Show a list of foods that have already been selected

    if (selectedFoods !== undefined) {
      return (
        Object.values(selectedFoods).map(food =>
          <Text key={food.name}>{food.name}, </Text>
        )
      );
    }
  }

  render() {
    const { preferenceText, foodText } = styles;
    const key = String(this.state.mealNumber);
    const selectedFoods = this.props.selectedFoodsArrays[key];
    return (
      <View>
        <Card>

          <CardSection>
            <Text style={preferenceText}>Meal {this.state.mealNumber} Preferences</Text>
          </CardSection>

          <CardSection>
            <Text style={foodText}>{this.renderSelectedFoodsList(selectedFoods)}</Text>
          </CardSection>

          <CardSection>
            <Button onPress={this.openAddFoodList.bind(this)}>
            <Icon name='food' size={18} /> Add Food
            </Button>
            <Button onPress={this.openDeleteFoodList.bind(this)}>
            <Icon name='food-off' size={18} /> Delete Food
            </Button>
          </CardSection>

        </Card>
      </View>
    );
  }
}

const styles = {
  preferenceText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  foodText: {
    fontSize: 14.5,
    fontStyle: 'italic'
  }
};

const mapStateToProps = state => {
  return {
    selectedFoodsArrays: state.foodPreferences.selectedFoodsArrays,
    error: state.foodPreferences.error,
    loading: state.foodPreferences.loading
  };
};

export default connect(mapStateToProps, { updateFoodPreferences })(FoodDetail);
