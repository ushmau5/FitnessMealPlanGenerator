import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Card, CardSection } from '../common';

class MainMenu extends Component {

  openQuestionForm() {
    Actions.QuestionForm();
  }

  openFoodPreferenceList() {
    Actions.FoodPreferenceList();
  }

  openMealPlan() {
    Actions.MealPlan();
  }

  openWeightStats() {
    Actions.WeightStats();
  }

  openGroupManager() {
    Actions.GroupManager();
  }

  render() {
    return (
      <ScrollView>
      <View>
        <Card>
          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={styles.subHeadlineText}>Setup</Text>
            <Text style={styles.setupText}> - Calculate your requried daily calories.</Text>
            <Text style={styles.setupText}> - Add some food preferences.</Text>
            <Text style={styles.setupText}> - Request a tailored meal plan.</Text>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Icon style={styles.iconStyle} name='chart-pie' size={45} color='black' />
            <Button onPress={this.openQuestionForm.bind(this)}>Calculate Calories</Button>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Icon style={styles.iconStyle} name='thumbs-up-down' size={45} color='black' />
            <Button onPress={this.openFoodPreferenceList.bind(this)}>Change Food Preferences</Button>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Icon style={styles.iconStyle} name='food' size={45} color='black' />
            <Button onPress={this.openMealPlan.bind(this)}>Meal Plan</Button>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Icon style={styles.iconStyle} name='chart-line' size={45} color='black' />
            <Button onPress={this.openWeightStats.bind(this)}>Weight Statistics</Button>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Icon style={styles.iconStyle} name='account-multiple' size={45} color='black' />
            <Button onPress={this.openGroupManager.bind(this)}>Group Manager</Button>
          </CardSection>
        </Card>
      </View>
      </ScrollView>
    );
  }
}

const styles = {
  iconStyle: {
    padding: 15,
    borderColor: 'black'
  },
  headlineText: {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 18,
  marginTop: 5,
  color: 'black'
},
subHeadlineText: {
  fontWeight: 'bold',
  fontSize: 17,
  color: 'black'
},
setupText: {
  fontWeight: 'bold',
  fontSize: 14,
  color: 'black'
}
};

export default MainMenu;
