import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import { setMealPlan } from '../../actions';
import { CardSection, Input, Card } from '../common';
import FoodRow from './FoodRow';

class EditMeal extends Component {
  /**
  * Props passed down to component
  * - mealNumber: number of meal being edited
  * - favouritedList: List of favourited meals (so they can be swapped out)
  */

  state = { selected: {} };

  saveServingSize(food, newServing) {
    const { mealNumber, mealPlan } = this.props;
    const editedPlan = { ...mealPlan };
    const meal = { ...editedPlan[mealNumber] };
    const editedFoodRef = { ...editedPlan[mealNumber].mealFoods[food.id] };
    const originalServing = editedFoodRef.serving;
    const numberAndDotRegex = new RegExp('^([0-9]+(.[0-9]+)?)$');
    console.log(mealPlan);

    if (numberAndDotRegex.test(newServing)) {
      meal.protein -= editedFoodRef.protein;
      meal.carbs -= editedFoodRef.carbs;
      meal.fats -= editedFoodRef.fats;
      meal.calories -= editedFoodRef.calories;
      editedFoodRef.protein = Number((editedFoodRef.protein / originalServing) * newServing);
      editedFoodRef.carbs = Number((editedFoodRef.carbs / originalServing) * newServing);
      editedFoodRef.fats = Number((editedFoodRef.fats / originalServing) * newServing);
      editedFoodRef.calories = Number((editedFoodRef.calories / originalServing) * newServing);
      editedFoodRef.serving = Number(newServing);
      meal.protein += editedFoodRef.protein;
      meal.carbs += editedFoodRef.carbs;
      meal.fats += editedFoodRef.fats;
      meal.calories += editedFoodRef.calories;

      // Redux bug where even if parent object (mealPlan) is cloned, its sub
      // components are still immutable, code below is a fix for this 'bug'...
      const mealFoods = { ...meal.mealFoods };
      mealFoods[food.id] = editedFoodRef;
      meal.mealFoods = mealFoods;
      editedPlan[mealNumber] = meal;
      
      this.props.setMealPlan(editedPlan);
    }
  }

  swapMealWithFavourite(selectedMeal) {
    const { mealNumber, mealPlan } = this.props;
    const editedPlan = { ...mealPlan };
    editedPlan[mealNumber] = selectedMeal;
    this.props.setMealPlan(editedPlan);
  }

  renderFoodRows() {
    const { mealNumber } = this.props;
    const meal = this.props.mealPlan[mealNumber];

    return (
      Object.values(meal.mealFoods).map(food =>
        <View key={food.id} style={{ flexDirection: 'row' }}>
          <FoodRow food={food} />
          <View style={styles.inputContainer}>
            <Input
              style={styles.inputStyle}
              keyboardType='numeric'
              defaultValue={food.serving.toString()}
              onEndEditing={(event) => this.saveServingSize(food, event.nativeEvent.text)}
            />
          </View>
          </View>
    )
  );
}

  renderPickerItems() {
    const { favouritedList } = this.props;
    return (
      Object.values(favouritedList).map(meal =>
        <Picker.Item key={meal.id} label={meal.name} value={meal} />
      )
    );
  }

  render() {
    const { mealNumber } = this.props;
    const meal = this.props.mealPlan[mealNumber];

    return (
      <View>
        <Card>
        {this.renderFoodRows()}
        <CardSection>
          <Text style={styles.caloriesHeader}>
            {Math.round(meal.protein)}g protein
             / {Math.round(meal.carbs)}g carb
             / {Math.round(meal.fats)}g fat
          </Text>
        </CardSection>
        <CardSection>
          <Text style={styles.caloriesHeader}>
            {Math.round(meal.calories)} calories
          </Text>
        </CardSection>
      </Card>

        <Card>
          <CardSection>
            <Text style={styles.nameHeader}>Swap With Favourite</Text>
          </CardSection>
          <CardSection>
            <Picker
              style={{ flex: 1 }}
              selectedValue={this.state.selected}
              onValueChange={(selectedMeal) => this.swapMealWithFavourite(selectedMeal)}
            >
              <Picker.Item label={''} />
              {this.renderPickerItems()}
            </Picker>
          </CardSection>
        </Card>
      </View>
    );
  }

}

const styles = {
  nameHeader: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  caloriesHeader: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    padding: 5,
    borderColor: '#ddd'
  }
};

const mapStateToProps = state => {
  return {
    mealPlan: state.mealPlan.mealPlan,
    error: state.mealPlan.error,
    loading: state.mealPlan.loading,
    favouritedList: state.mealPlan.favouritedList
  };
};

export default connect(mapStateToProps, { setMealPlan })(EditMeal);
