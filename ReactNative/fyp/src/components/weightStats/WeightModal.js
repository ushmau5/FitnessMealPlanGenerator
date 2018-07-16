import React, { Component } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { CustomModal, Input } from '../common';
import { setModalWeight, updatePickerMetric } from '../../actions';

class WeightModal extends Component {

  render() {
    return (
      <CustomModal
      visible={this.props.visible}
      onAccept={this.props.onAccept}
      onDecline={this.props.onDecline}
      >
        <Input
        placeholder={'75'}
        value={this.props.modalWeight}
        onChangeText={(val) => this.props.setModalWeight(val)}
        />
        <Picker
        style={{ flex: 1 }}
        selectedValue={this.props.metric}
        onValueChange={(itemValue) => this.props.updatePickerMetric(itemValue)}
        >
          <Picker.Item label="Kg" value="kg" />
          <Picker.Item label="lbs" value="lbs" />
        </Picker>
      </CustomModal>
    );
  }

}

const mapStateToProps = state => {
  return {
    error: state.weightStats.error,
    loading: state.weightStats.loading,
    allWeights: state.weightStats.allWeights,
    modalWeight: state.weightStats.modalWeight,
    metric: state.weightStats.metric
  };
};

export default connect(mapStateToProps, { setModalWeight, updatePickerMetric })(WeightModal);
