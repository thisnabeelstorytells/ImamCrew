import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonGroup, Header, Text, Divider } from 'react-native-elements'

export default class ComingToggle extends React.Component {

  render() {

    return (
      <ButtonGroup
      selectedBackgroundColor="#2ecc71"
      onPress={this.props.onPress}
      selectedIndex={this.props.selectedIndex}
      buttons={['NO', 'YES']}
      containerStyle={{height: 30}} />
    )

  }
}

const styles = StyleSheet.create({
  question: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25
  },
  toggleButton: {
    backgroundColor: "#e74c3c"
  },
});
