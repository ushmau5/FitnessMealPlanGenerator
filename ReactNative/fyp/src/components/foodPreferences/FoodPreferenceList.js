import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, CardSection, Button, LoadingOverlay } from '../common';
import FoodDetail from './FoodDetail';
import { updateNumberOfMeals, saveFoodPreferences, fetchFoodPreferences, foodPreferencesSetLoading } from '../../actions';

class FoodPreferenceList extends Component {
  /**
   * TODO
   * 1. Prevent empty FoodDetails from being saveFoodPreferences
   */

  componentWillMount() {
    this.props.foodPreferencesSetLoading();
    this.props.fetchFoodPreferences();
  }

  onSaveButtonPress() {
    let selectedFoodsContainer = { ...this.props.selectedFoodsArrays };
    // Check if the user deleted any meals.. //
    Object.values(selectedFoodsContainer).map((meal, index) =>
      selectedFoodsContainer = this.deleteMeal(selectedFoodsContainer, (index + 1))
    );
    // Push to Firebase
    this.props.saveFoodPreferences(selectedFoodsContainer);
  }


  /**
   * Used to delete meals above the specified numberOfMeals set with the slider
   * If the person had 3 meals and set the numberOfMeals to 1 with the Slider
   * meals 2 and 3 would be removed and the changes pushed to Firebase.
   */
  deleteMeal(selectedFoodsContainer, mealNumber) {
    if (mealNumber > this.props.numberOfMeals) {
      delete selectedFoodsContainer[mealNumber];
    }
    return (selectedFoodsContainer);
  }

  incNumberOfMeals() {
    if (this.props.numberOfMeals < 15) {
      this.props.updateNumberOfMeals(Number(this.props.numberOfMeals + 1));
    }
  }

  decNumberOfMeals() {
    if (this.props.numberOfMeals > 1) {
      this.props.updateNumberOfMeals(Number(this.props.numberOfMeals - 1));
    }
  }

  renderFoodDetails() {
    const foodDetails = [];
    for (let i = 0; i < this.props.numberOfMeals; i++) {
      foodDetails.push(<FoodDetail key={i} mealNumber={i + 1} />);
    }
    return foodDetails;
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
        <CardSection>
          <Text style={styles.headerText}>Number Of Meals</Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.incNumberOfMeals.bind(this)}>
            <Icon name='plus-box-outline' size={30} />
          </Button>
          <Button onPress={this.decNumberOfMeals.bind(this)}>
            <Icon name='minus-box-outline' size={30} />
          </Button>
        </CardSection>
      </Card>
        {this.renderFoodDetails()}
      <Card>
        <CardSection>
          <Button onPress={this.onSaveButtonPress.bind(this)}>Save</Button>
        </CardSection>
      </Card>
      </ScrollView>
      {this.renderLoading()}
      </View>
    );
  }
}

const styles = {
  headerText: {
    fontSize: 17,
    fontWeight: 'bold'
  }
};

const mapStateToProps = state => {
  return {
    numberOfMeals: state.foodPreferences.numberOfMeals,
    selectedFoodsArrays: state.foodPreferences.selectedFoodsArrays,
    error: state.foodPreferences.error,
    loading: state.foodPreferences.loading
  };
};

export default connect(mapStateToProps, { updateNumberOfMeals, saveFoodPreferences, fetchFoodPreferences, foodPreferencesSetLoading })(FoodPreferenceList);
