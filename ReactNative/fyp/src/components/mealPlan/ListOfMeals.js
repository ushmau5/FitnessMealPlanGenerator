import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Meal from './Meal';

class ListOfMeals extends Component {
  state = { showModal: false, pressedMeal: {} };
  /* Props
  * mealList: List of meal objects to be rendered
  * favourited: List of meals that are already favourited
  * favouritedList: List of meals that have been already favourited
  * admin: Flag that renders buttons only the logged in user should be able to use.
  */

  onMealPress(index) {
    const { favouritedList } = this.props;
    const mealNumber = index + 1;
    Actions.EditMeal({ mealNumber, favouritedList });
  }

  renderListOfMeals() {
    const { mealList, favouritedList, admin } = this.props;
    // TODO: If there are duplicates of a meal in mealLiss rendering errors occur... //
    if (mealList !== undefined) {
      return (
        Object.values(mealList).map((meal, index) => {
          if (admin === true) {
            if (favouritedList !== undefined && Object.prototype.hasOwnProperty.call(favouritedList, meal.id)) {
              return (
                <TouchableOpacity key={meal.id} onPress={this.onMealPress.bind(this, index)}>
                  <Meal meal={meal} favourited favouritedList={favouritedList} admin={admin} />
                </TouchableOpacity>
              );
            }
              return (
              <TouchableOpacity key={meal.id} onPress={this.onMealPress.bind(this, index)}>
                <Meal key={meal.id} meal={meal} favourited={false} favouritedList={favouritedList} admin={admin} />
              </TouchableOpacity>
            );
          }
          if (favouritedList !== undefined && Object.prototype.hasOwnProperty.call(favouritedList, meal.id)) {
            return (
                <Meal meal={meal} favourited favouritedList={favouritedList} admin={admin} />
            );
          }
            return (
              <Meal key={meal.id} meal={meal} favourited={false} favouritedList={favouritedList} admin={admin} />
          );
        })
      );
      }
    }

  render() {
    return (
      <ScrollView>
        <View>
        {this.renderListOfMeals()}
      </View>
      </ScrollView>
    );
  }

}

export default ListOfMeals;
