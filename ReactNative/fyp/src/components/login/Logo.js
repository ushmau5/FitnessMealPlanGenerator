import React from 'react';
import { Image, Text, View } from 'react-native';

const Logo = ({ children }) => {
  return (
    <View style={styles.logoStyle}>
      <Image
        source={{ uri: 'https://i.imgur.com/tEXCQQ3.png' }}
        style={{ height: 210, width: 210 }}
      />
      <Text style={styles.textStyle}>{children}</Text>
    </View>
  );
};

const styles = {
  logoStyle: {
    alignItems: 'center',
    paddingTop: 10,
  },
  textStyle: {
    fontStyle: 'italic',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: '#252525',
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 10
  }
};

export default Logo;
