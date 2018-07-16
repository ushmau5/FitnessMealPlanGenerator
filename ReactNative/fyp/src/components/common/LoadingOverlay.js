import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingOverlay = () => {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size='large' />
      </View>
    );
};

const styles = {
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88'
  }
};

export { LoadingOverlay };
