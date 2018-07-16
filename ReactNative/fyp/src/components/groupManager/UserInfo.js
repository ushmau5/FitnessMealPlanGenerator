import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, CardSection, LoadingOverlay } from '../common';
import Meal from '../mealPlan/Meal';
import ListOfMeals from '../mealPlan/ListOfMeals';
import WeightStats from '../weightStats/WeightStats';
import { fetchMealPlanForUserInfo, fetchAllWeightsForUserInfo, fetchQuestionFormForUserInfo } from '../../actions';

class UserInfo extends Component {

  componentWillMount() {
    // Component can be called with a UID passed to it, e.g in UserInfo.js //
    const { uid } = this.props;
    this.props.fetchMealPlanForUserInfo(uid);
    this.props.fetchQuestionFormForUserInfo(uid);
  }

renderUserInfo() {
  const { questionForm } = this.props;
  const { userInfoText, headerText } = styles;
  return (
    <Card>
      <CardSection>
        <Text style={headerText}>
          <Icon name='account' size={18} /> User Info
        </Text>
      </CardSection>
      <CardSection style={{ flexDirection: 'column' }}>
        <Text style={userInfoText}>Gender: {questionForm.gender}</Text>
        <Text style={userInfoText}>Age: {questionForm.age}</Text>
        <Text style={userInfoText}>Weight: {questionForm.weight}Kg</Text>
        <Text style={userInfoText}>Height: {questionForm.height}cm</Text>
        <Text style={userInfoText}>Calories: {questionForm.goalCalories}Kcal</Text>
      </CardSection>
    </Card>
  );
}

renderBorderLine() {
  return (
    <View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 1.5,
    marginTop: 15
  }}
    />
  );
}

  renderLoading() {
    if (this.props.loading) return <LoadingOverlay />;
  }

  renderError() {
    if (this.props.error) {
      return (
        <Card>
        <CardSection>
          <Text style={styles.errorText}>{this.props.error}</Text>
        </CardSection>
      </Card>
      );
    }
  }

  render() {
    return (
      <View>
      <ScrollView>
        {this.renderError()}
        {this.renderUserInfo()}
        {this.renderBorderLine()}
        <ListOfMeals mealList={this.props.mealPlan} />
        {this.renderBorderLine()}
        <WeightStats enteredUid={this.props.uid} />
      </ScrollView>
      {this.renderLoading()}
      </View>
    );
  }

}

const styles = {
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  userInfoText: {
    fontSize: 15
  },
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'red'
  }
};

const mapStateToProps = state => {
  // uid is also passed down to the component as a prop by GroupManager, not by redux..
  return {
    mealPlan: state.userInfo.mealPlan,
    questionForm: state.userInfo.questionForm,
    error: state.userInfo.error,
    loading: state.userInfo.loading
  };
};

export default connect(mapStateToProps, { fetchMealPlanForUserInfo, fetchAllWeightsForUserInfo, fetchQuestionFormForUserInfo })(UserInfo);
