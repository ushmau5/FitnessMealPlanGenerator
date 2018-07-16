import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { VictoryPie, VictoryBar, VictoryChart } from 'victory-native';

class UserStatistics extends Component {
  /**
  * Props: this.props.*
  * - .users: collection of all users in the group.
  **/

  getGenderCountData() {
    let male = 0;
    let female = 0;
    let data = {};
      if (this.props.users !== undefined) {
          Object.values(this.props.users).map(user => {
            if (user.gender === 'Male') male++;
            if (user.gender === 'Female') female++;
          }
        );
        data = [{ x: 'Male', y: male }, { x: 'Female', y: female }];
        return data;
      }
    }

    getAgeCountData() {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let data = {};
        if (this.props.users !== undefined) {
            Object.values(this.props.users).map(user => {
              if (Number(user.age) >= 13 && Number(user.age) <= 25) a++;
              if (Number(user.age) >= 26 && Number(user.age) <= 44) b++;
              if (Number(user.age) >= 45 && Number(user.age) <= 64) c++;
              if (Number(user.age) >= 65) d++;
            }
          );
          data = [
            { x: '13-25', y: a },
            { x: '26-44', y: b },
            { x: '45-64', y: c },
            { x: '64+', y: d }
          ];
          return data;
        }
      }


  render() {
    return (
      <ScrollView>
      <View style={{ alignItems: 'center' }}>
        <VictoryPie
          data={this.getGenderCountData()}
          animate={{ duration: 2000 }}
          labelRadius={20}
          style={{
            labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' },
            data: { stroke: 'black', strokeWidth: 2 }
          }}
          colorScale={['#319EE1', 'pink']}
          height={150}
          width={150}
          padding={10}
        />
        <VictoryChart
          domainPadding={20}
        >
          <VictoryBar
            data={this.getAgeCountData()}
            style={{ data: { fill: '#64779A', width: 12, stroke: 'black', strokeWidth: 1.5 } }}
            animate={{ duration: 20000 }}
            height={150}
            width={150}
            padding={10}
          />
        </VictoryChart>
      </View>
    </ScrollView>
    );
  }

}

export default UserStatistics;
