import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CardSection } from '../common';

class FoodRow extends Component {

  render() {
    return (
      <View>
      <CardSection style={{ flexDirection: 'column' }}>
        <Text style={styles.foodHeader}>{this.props.food.name}</Text>
        <Text>{this.props.food.serving} serving(s) of {this.props.food.metric}</Text>
        <Text>
          {Math.round(this.props.food.protein)}g protein
           / {Math.round(this.props.food.carbs)}g carb
           / {Math.round(this.props.food.fats)}g fat
        </Text>
        <Text>{Math.round(this.props.food.calories)} calories</Text>
      </CardSection>
      </View>
    );
  }

}

const styles = {
  foodHeader: {
    fontSize: 16.5
  }
};

export default FoodRow;
