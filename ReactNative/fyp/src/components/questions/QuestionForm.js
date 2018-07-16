import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, Slider, Picker, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, CardSection, Button, LoadingOverlay } from '../common';
import { updateQuestionForm, saveQuestionForm, fetchQuestionForm, questionFormSetLoading } from '../../actions';

class QuestionForm extends Component {
  /*
  1. Read in values from main redux state.
  2. Making adjustments changes the values stored in the main redux state.
  3. Hitting save will save the values to firebase.
  */
  componentWillMount() {
    this.props.questionFormSetLoading();
    this.props.fetchQuestionForm();
  }

  onMaleButtonPress() {
    this.props.updateQuestionForm({ prop: 'gender', value: 'Male' });
  }

  onFemaleButtonPress() {
    this.props.updateQuestionForm({ prop: 'gender', value: 'Female' });
  }

  // Calculates the maintenance and goal calorie values //
  onCalorieButtonPress() {
    const { gender, age, weight, height, activityLevel, goal } = this.props;
    let maintenanceCalories = 0;

    if (gender === 'Male') {
      maintenanceCalories =
      ((10 * weight) + (6.25 * height) - (5 * age) + 5) * activityLevel;
    }

    if (gender === 'Female') {
      maintenanceCalories =
      ((10 * weight) + (6.25 * height) - (5 * age) - 161) * activityLevel;
    }

    const goalCalories = (+maintenanceCalories) + (+goal);
    this.props.updateQuestionForm(
      { prop: 'maintenanceCalories', value: this.roundToNearest(maintenanceCalories, 50) }
    );
    this.props.updateQuestionForm(
      { prop: 'goalCalories', value: this.roundToNearest(goalCalories, 50) }
    );
    }

    onSaveButtonPress() {
      this.props.saveQuestionForm(this.props.questionForm);
    }

    // Rounds a number to the nearest value //
    roundToNearest(num, rounding) {
      // If rounding is 10, number rounds to nearest 10
      let number = num;
      number /= rounding;
      number = Math.round(number);
      number *= rounding;
      return number;
    }

    cmToFt(num) {
      const ft = ((num * 0.393700) / 12);
      const roundFt = Math.floor(ft);
      const inches = Math.round((ft - roundFt) * 12);
      return `${roundFt}ft ${inches}in`;
    }

    renderLoading() {
      if (this.props.loading) {
        return <LoadingOverlay />;
      }
    }

    renderError() {
      if (this.props.error.length > 0) {
        return (
          <Card>
            <CardSection style={{ justifyContent: 'center' }}>
              <Text style={styles.errorText}>{this.props.error}</Text>
            </CardSection>
          </Card>
        );
      }
    }

  render() {
    const { sliderStyle, pickerStyle, headerText } = styles;

    return (
      <View>
      <ScrollView>

        {this.renderError()}

        <Card>
          <CardSection>
          <Icon name='gender-male-female' size={19} />
            <Text style={headerText}> Gender: {this.props.gender}</Text>
          </CardSection>
          <CardSection>
            <Button onPress={this.onMaleButtonPress.bind(this)}>Male</Button>
            <Button onPress={this.onFemaleButtonPress.bind(this)}>Female</Button>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Icon name='account' size={19} />
            <Text style={headerText}> Age: {this.props.age}</Text>
          </CardSection>
          <CardSection>
            <Slider
              style={sliderStyle}
              minimumValue={10}
              maximumValue={85}
              step={1}
              onValueChange={age => this.props.updateQuestionForm({ prop: 'age', value: age })}
            />
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Icon name='scale-bathroom' size={19} />
            <Text style={headerText}> Weight: {this.props.weight}kg   |   {this.roundToNearest(this.props.weight * 2.20462, 1)}lbs</Text>
          </CardSection>
          <CardSection>
            <Slider
              style={sliderStyle}
              minimumValue={30}
              maximumValue={140}
              step={1}
              onValueChange={weight => this.props.updateQuestionForm({ prop: 'weight', value: weight })}
            />
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Icon name='human-handsup' size={19} />
            <Text style={headerText}> Height: {this.props.height}cm   |   {this.cmToFt(this.props.height)}</Text>
          </CardSection>
          <CardSection>
            <Slider
              style={sliderStyle}
              minimumValue={90}
              maximumValue={215}
              step={1}
              onValueChange={height => this.props.updateQuestionForm({ prop: 'height', value: height })}
            />
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Icon name='run-fast' size={19} />
            <Text style={headerText}> Activity Level</Text>
          </CardSection>
          <CardSection>
            <Picker
              style={pickerStyle}
              selectedValue={this.props.activityLevel}
              onValueChange={(itemValue, itemIndex) => this.props.updateQuestionForm({ prop: 'activityLevel', value: itemValue })}
            >
              <Picker.Item label="Sedentary (little to no excercise)" value="1.2" />
              <Picker.Item label="Light activity (1-3 days/wk)" value="1.375" />
              <Picker.Item label="Moderate activity (3-5 days/wk)" value="1.55" />
              <Picker.Item label="Very active (6-7 days/wk)" value="1.725" />
            </Picker>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Icon name='dumbbell' size={19} />
            <Text style={headerText}> Goal</Text>
          </CardSection>
          <CardSection>
            <Picker
              style={pickerStyle}
              selectedValue={this.props.goal}
              onValueChange={(itemValue, itemIndex) => this.props.updateQuestionForm({ prop: 'goal', value: itemValue })}
            >
              <Picker.Item label="Gain weight (aggressive)" value="500" />
              <Picker.Item label="Gain weight (moderate)" value="250" />
              <Picker.Item label="Gain weight (light)" value="100" />
              <Picker.Item label="Lose weight (light)" value="-100" />
              <Picker.Item label="Lose weight (moderate)" value="-250" />
              <Picker.Item label="Lose weight (aggressive)" value="-500" />
            </Picker>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Icon name='food-fork-drink' size={19} />
            <Text style={headerText}> Calories: {this.props.goalCalories}Kcal</Text>
          </CardSection>
          <CardSection>
            <Button onPress={this.onCalorieButtonPress.bind(this)}>Calculate Calories</Button>
          </CardSection>
        </Card>

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
  sliderStyle: {
    flex: 1
  },
  pickerStyle: {
    flex: 1
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
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
  return {
    error: state.questions.error,
    loading: state.questions.loading,
    questionForm: state.questions.questionForm,
    gender: state.questions.questionForm.gender,
    age: state.questions.questionForm.age,
    weight: state.questions.questionForm.weight,
    height: state.questions.questionForm.height,
    activityLevel: state.questions.questionForm.activityLevel,
    goal: state.questions.questionForm.goal,
    maintenanceCalories: state.questions.questionForm.maintenanceCalories,
    goalCalories: state.questions.questionForm.goalCalories
  };
};

export default connect(mapStateToProps, { updateQuestionForm, saveQuestionForm, fetchQuestionForm, questionFormSetLoading })(QuestionForm);
