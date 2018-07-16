import React, { Component } from 'react';
import { Picker, Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { Card, CardSection, Button, LoadingOverlay } from '../common';
import { fetchAllWeights, pushModalWeightToFirebase, updatePickerMetric, updateDisplayTimeframe } from '../../actions';
import WeightModal from './WeightModal';

class WeightStats extends Component {
  state = {
    showModal: false
  }

  componentWillMount() {
    const { enteredUid } = this.props;
    this.props.fetchAllWeights(enteredUid);
  }

  onAccept() {
    if (this.props.modalWeight.length > 0) {
      const { modalWeight } = this.props;
      const dateKey = String(moment().format('MMMM DD YYYY')); // January 16 2018
      const obj = {
        kg: '',
        lbs: ''
      };

      // Get weight in both kg and lbs for Firebase
      if (this.props.metric === 'lbs') {
        obj.kg = String(modalWeight * 0.453592);
        obj.lbs = modalWeight;
      } else {
        obj.kg = modalWeight;
        obj.lbs = String(modalWeight / 0.453592);
      }

      this.props.pushModalWeightToFirebase({ dateKey, obj });
      this.setState({ showModal: false });
    }
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  getDisplayData() {
    const { allWeights, timeframe } = this.props;
    let displayData = {};

    if (timeframe !== 'alltime') {
      const numRewindDays = Number(timeframe);

      for (let i = numRewindDays; i >= 0; i--) {
        const dateKey = String(moment().subtract(i, 'days').format('MMMM DD YYYY'));
        if (allWeights[dateKey] !== undefined) {
          displayData[dateKey] = allWeights[dateKey];
        }
      }
    } else {
      displayData = allWeights;
    }
    return displayData;
  }

  round(value, decimals) {
    return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
  }

  // Render user weights based on selected timeframe and metric
  renderDisplayWeights() {
    const { metric } = this.props;
    const displayData = this.getDisplayData();

    return (
    // Reverse the entries for display purposes (most recent entry at top of list)
    Object.keys(displayData).reverse().map(key => <CardSection key={key}>
      <Text style={styles.displayDataText}>{key}
        : {this.round(displayData[key][metric], 2)}{metric}</Text>
    </CardSection>));
  }

  renderGraph() {
    const { metric } = this.props;
    const displayData = this.getDisplayData();
    const data = [];
    const xAxisData = [];
    const yAxisData = [];

    Object.keys(displayData).map((key, index) => {
      data.push({ x: index, y: Number(displayData[key][metric]) });
      xAxisData.push(index);
      yAxisData.push(displayData[key][metric]);
    });

    if (data !== undefined && data.length > 1 && data !== null) {
      return (
        <View>
          <VictoryChart
            theme={VictoryTheme.material}
            animate={{ duration: 2000 }}
          >
            <VictoryAxis tickValues={xAxisData} tickFormat={() => ''} />
            <VictoryAxis dependentAxis />
            <VictoryLine
              data={data}
              style={{ data: { stroke: '#64779A' }, parent: { border: '1px solid #ccc' } }}
            />
          </VictoryChart>
      </View>
      );
    }
  }

  renderTrendAnalysisText() {
    const { metric, timeframe } = this.props;
    const displayData = this.getDisplayData();

    if (Object.keys(displayData).length > 0 && timeframe !== 'alltime') {
      const lastIndex = Number(Object.keys(displayData).length - 1);
      const firstEntry = displayData[Object.keys(displayData)[0]];
      const lastEntry = displayData[Object.keys(displayData)[lastIndex]];
      const weightDif = Number(lastEntry[metric]) - Number(firstEntry[metric]);

      return (
        <Text style={styles.trendAnalysisText}>
          Change of {this.round(weightDif, 2)}{metric} in the past {timeframe} days
        </Text>
      );
    }
    return (<Text style={styles.trendAnalysisText}>Select a timeframe...</Text>);
  }

  renderLoading() {
    if (this.props.loading) return <LoadingOverlay />;
    }

  // Only render the button if WeightStats is opened by the current user and not a manager looking at a users profile
  renderUpdateWeightButton() {
    if (this.props.enteredUid === undefined) {
      return (<CardSection>
        <Button onPress={() => this.setState({ showModal: true })}>
          <Icon name='scale-bathroom' size={18} />
          Update Weight
        </Button>
      </CardSection>);
    }
  }

  render() {
    return (<View>
      <ScrollView>
        <WeightModal visible={this.state.showModal} onAccept={this.onAccept.bind(this)} onDecline={this.onDecline.bind(this)} />
        <Card>
          <CardSection>
          {this.renderGraph()}
          </CardSection>
        </Card>

        <Card>
          {this.renderUpdateWeightButton()}
          <CardSection>
            <Picker
              style={{ flex: 1 }}
              selectedValue={this.props.metric} onValueChange={(itemValue) => this.props.updatePickerMetric(itemValue)}
            >
              <Picker.Item label="Kg" value="kg" />
              <Picker.Item label="lbs" value="lbs" />
            </Picker>
            <Picker
              style={{ flex: 1 }}
              selectedValue={this.props.timeframe} onValueChange={(itemValue) => this.props.updateDisplayTimeframe(itemValue)}
            >
              <Picker.Item label="Past week" value="7" />
              <Picker.Item label="Past month" value="31" />
              <Picker.Item label="Past 6 months" value="183" />
              <Picker.Item label="Past year" value="365" />
              <Picker.Item label="All time" value="alltime" />
            </Picker>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            {this.renderTrendAnalysisText()}
          </CardSection>
        </Card>

        <Card>
          {this.renderDisplayWeights()}
        </Card>

      </ScrollView>
      {this.renderLoading()}
    </View>);
  }

}

const styles = {
  trendAnalysisText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  displayDataText: {
    fontSize: 14.5
  }
};

const mapStateToProps = state => {
  return {
    error: state.weightStats.error,
    loading: state.weightStats.loading,
    allWeights: state.weightStats.allWeights,
    modalWeight: state.weightStats.modalWeight,
    metric: state.weightStats.metric,
    timeframe: state.weightStats.timeframe
  };
};

export default connect(mapStateToProps, { fetchAllWeights, pushModalWeightToFirebase, updatePickerMetric, updateDisplayTimeframe })(WeightStats);
