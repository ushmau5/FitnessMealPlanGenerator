import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from '../../Config';
import { Card, CardSection } from '../common';
import FoodRow from './FoodRow';
import { ActionButton } from './ActionButton';
import { startLoading, stopLoading } from '../../actions';

class Meal extends Component {
  // favourtiedList prop passed down from ListOfMeals
  //  - used to see which similiar meals are already favourited
  // Redux not needed here as no major state, only booleans used to alter rendering.. //
  state = { liked: false, favourited: false };

    componentWillMount() {
      if (this.props.favourited) {
        this.setState({ favourited: true });
      }
    }

    getSimiliarMeals() {
      const mealId = this.props.meal.id;
      this.props.startLoading();
        axios.get(`${Config.BASE_URL}/meal/${mealId}/similar`)
        .then(response => {
          this.props.stopLoading();
          Actions.ListOfMeals({ mealList: response.data, favouritedList: this.props.favouritedList });
        })
        .catch();
        // NOTE: Catch() always executed even on success for some reason..
    }

    likeMeal() {
        const { currentUser } = firebase.auth();
        const mealId = this.props.meal.id;
        this.props.startLoading()
          axios.post(`${Config.BASE_URL}/meal/${mealId}/like`, currentUser.uid)
          .then(response => {
            this.props.stopLoading();
            this.setState({ liked: response.data });
          })
          .catch();
      }

    favOrUnfavMeal() {
      const { currentUser } = firebase.auth();
      const meal = this.props.meal;

      if (this.state.favourited) {
        firebase.database().ref(`users/${currentUser.uid}/favouritedMeals/${meal.id}`)
        .set(null)
        .then(response => {
          if (this.refs.mealRef) this.setState({ favourited: false });
      })
      .catch();
    } else {
      firebase.database().ref(`users/${currentUser.uid}/favouritedMeals/${meal.id}`)
      .set(meal)
      .then(response => {
        if (this.refs.mealRef) this.setState({ favourited: true });
      })
      .catch();
    }
  }

    renderFoodRows() {
      return (
        Object.values(this.props.meal.mealFoods).map(food =>
          <FoodRow key={food.id} food={food} />
      )
    );
  }

  renderLike() {
    if (!this.state.liked) return <Icon name='thumb-up-outline' size={20} color='green' />;
  }

  renderFavouriteOrUnfavourite() {
    if (this.state.favourited) return <Icon name='heart' size={20} color='red' />;
      return <Icon name='heart-outline' size={20} />;
  }

  renderSimilarityRating() {
    const { tanimoto } = this.props.meal;
    if (tanimoto !== 0 && tanimoto !== undefined) {
      return (
        <CardSection>
          <Text style={styles.similarityText}>
            {Math.round(Number(tanimoto) * 100)}% also liked
          </Text>
        </CardSection>
      );
    }
  }

  renderMealHeader() {
    if (this.props.admin) {
      return (
        <CardSection>
          <View>
            <Text style={styles.nameHeader}>{this.props.meal.name}</Text>
          </View>
          <ActionButton onPress={this.likeMeal.bind(this)}>
            {this.renderLike()}
          </ActionButton>
          <ActionButton onPress={this.favOrUnfavMeal.bind(this)}>
            {this.renderFavouriteOrUnfavourite()}
          </ActionButton>
          <ActionButton onPress={this.getSimiliarMeals.bind(this)}>
            <Icon name='find-replace' size={20} color='orange' />
          </ActionButton>
        </CardSection>
      );
    }
    return (
      <CardSection>
        <View>
          <Text style={styles.nameHeader}>{this.props.meal.name}</Text>
        </View>
      </CardSection>
    );
  }

  render() {
    return (
      <View ref='mealRef'>
      <Card>

        {this.renderMealHeader()}
        {this.renderSimilarityRating()}
        {this.renderFoodRows()}

        <CardSection>
          <Text style={styles.caloriesHeader}>
            {Math.round(this.props.meal.protein)}g protein
             / {Math.round(this.props.meal.carbs)}g carb
             / {Math.round(this.props.meal.fats)}g fat
          </Text>
        </CardSection>
        <CardSection>
          <Text style={styles.caloriesHeader}>
            {Math.round(this.props.meal.calories)} calories
          </Text>
        </CardSection>

      </Card>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    error: state.mealPlan.error,
    loading: state.mealPlan.loading,
  };
};

const styles = {
  nameHeader: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  caloriesHeader: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  similarityText: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: 'green',
    fontStyle: 'italic'
  }
};

export default connect(mapStateToProps, { startLoading, stopLoading })(Meal);
