import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const CustomModal = ({ children, visible, onAccept, onDecline }) => {
  const { cardSectionStyle, containerStyle, textStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
      >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          {children}
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}>Accept</Button>
          <Button onPress={onDecline}>Decline</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { CustomModal };
