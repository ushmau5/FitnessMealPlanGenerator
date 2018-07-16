import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, ImageBackground, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import Logo from './Logo';
import { usernameChanged, emailChanged, passwordChanged, loginUser, confirmPasswordChanged, setError, signUpUser } from '../../actions';
import { LoadingOverlay } from '../common';
import { Input } from './Input';

class SignUpForm extends Component {

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onConfirmPasswordChange(text) {
    this.props.confirmPasswordChanged(text);
  }

  onSignUpPress() {
    const { username, email, password, confirmPassword } = this.props;
    if (password === confirmPassword) {
      this.props.signUpUser({ username, email, password });
    } else {
      this.props.setError('passwords do not match!');
    }
  }

  renderLoading() {
    if (this.props.loading) {
      return <LoadingOverlay />;
    }
  }

  render() {
    const { logoContainer, formContainer, buttonsContainer, inputField } = styles;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: 'https://i.imgur.com/pILIgti.png' }}
          style={{ height: '100%', width: '100%' }}
        >

        <View style={logoContainer}>
          <Logo />
        </View>

        <View style={formContainer}>
          <View style={inputField}>
          <Icon name='account-circle' size={22} color='#ABB3BE' />
          <Input
            label="Username"
            placeholder="Username"
            onChangeText={this.onUsernameChange.bind(this)}
            value={this.props.username}
            placeholderTextColor={'#ABB3BE'}
          />
        </View>
        <View style={inputField}>
          <Icon name='account' size={22} color='#ABB3BE' />
          <Input
            label="Email"
            placeholder="mail@mail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            placeholderTextColor={'#ABB3BE'}
          />
        </View>
        <View style={inputField}>
          <Icon name='lock' size={22} color='#ABB3BE' />
          <Input
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            secureTextEntry
            value={this.props.password}
            placeholderTextColor={'#ABB3BE'}
          />
        </View>
        <View style={inputField}>
          <Icon name='lock' size={22} color='#ABB3BE' />
          <Input
            label="Confirm password"
            placeholder="confirm password"
            onChangeText={this.onConfirmPasswordChange.bind(this)}
            secureTextEntry
            value={this.props.confirmPassword}
            placeholderTextColor={'#ABB3BE'}
          />
        </View>

          <View style={buttonsContainer}>
            <Text style={styles.errorText}>
              {this.props.error}
            </Text>
            <Button onPress={this.onSignUpPress.bind(this)}>
              Confirm Sign Up
            </Button>
          </View>
        </View>

        </ImageBackground>
      {this.renderLoading()}
      </View>
    </ScrollView>
    );
  }
}

const styles = {
  logoContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center'
  },
  inputField: {
    borderColor: 'rgba(255,255,255,0.2)',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  formContainer: {
    marginTop: 50,
    aligntItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.75,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
    justifyContent: 'flex-end'
  },
  errorText: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 18
  }
};

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    email: state.auth.email,
    password: state.auth.password,
    confirmPassword: state.auth.confirmPassword,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { usernameChanged, emailChanged, passwordChanged, loginUser, confirmPasswordChanged, setError, signUpUser })(SignUpForm);
