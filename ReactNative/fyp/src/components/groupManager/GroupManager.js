import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, ScrollView, Share, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Card, CardSection, Input, LoadingOverlay } from '../common';
import Config from '../../Config';
import UserStatistics from './UserStatistics';
import { fetchUsers, addUser, updateEnteredUid } from '../../actions';

class GroupManager extends Component {

  componentWillMount() {
    this.props.fetchUsers();
  }

  onEnteredUidChange(text) {
    this.props.updateEnteredUid(text);
  }

  addUser() {
    const { enteredUid } = this.props;
    this.props.addUser(enteredUid);
  }

  openUserInfo(uid) {
    Actions.UserInfo({ uid });
  }

  shareUID() {
    const { currentUser } = firebase.auth();
    Share.share({ message: `My ID for ${Config.APP_NAME} is: ${currentUser.uid}` });
  }

  renderUsers() {
    if (this.props.users !== undefined) {
      return (
        Object.values(this.props.users).map(user =>
          <CardSection key={user.uid}>
            <Button onPress={this.openUserInfo.bind(this, user.uid)}>
              <Icon name='account' size={18} /> {user.username}
            </Button>
          </CardSection>
      )
    );
  }
}

  renderLoading() {
    if (this.props.loading) return <LoadingOverlay />;
  }

  render() {
    const { currentUser } = firebase.auth();
    const { headerText, errorText, successText } = styles;

    return (
      <View>
      <ScrollView>
        <Card>
          <CardSection>
            <Text style={headerText}>
              <Icon name='account-key' size={18} /> UserID
            </Text>
          </CardSection>
          <CardSection>
            <Button onPress={this.shareUID.bind(this)}>{currentUser.uid}</Button>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Text style={headerText}>
              <Icon name='chart-line' size={18} /> User Statistics
            </Text>
          </CardSection>
          <CardSection>
            <UserStatistics users={this.props.users} />
          </CardSection>
        </Card>

        <Card>
        <CardSection>
          <Text style={headerText}>
            <Icon name='account-multiple' size={18} /> Managed Users
          </Text>
        </CardSection>
        <CardSection>
          <Text style={errorText}>{this.props.error}</Text>
          <Text style={successText}>{this.props.success}</Text>
        </CardSection>
            {this.renderUsers()}
        </Card>

        <Card>
          <CardSection style={{ flexDirection: 'column' }}>
          <Input
            label="UID"
            placeholder="Enter a user id..."
            onChangeText={this.onEnteredUidChange.bind(this)}
            value={this.props.enteredUid}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.addUser.bind(this)}>
            <Icon name='account-plus' size={18} /> Add User
          </Button>
          </CardSection>
        </Card>
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
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'red'
  },
  successText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'green'
  }
};

const mapStateToProps = state => {
  return {
    users: state.groupManager.users,
    error: state.groupManager.error,
    success: state.groupManager.success,
    loading: state.groupManager.loading,
    enteredUid: state.groupManager.enteredUid
  };
};

export default connect(mapStateToProps, { fetchUsers, addUser, updateEnteredUid })(GroupManager);
