import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default class BookForm extends Component {
  constructor(props) {
    super(props);
    this.title = {title: ''};
    this.author = {author: ''};
  }
  render() {
    return (
      <View style={styles.app}>
        <Text style={styles.appIntro}>
          Loading...
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appIntro: {
    flex: 2,
    fontSize: 30,
    padding: 100,
    textAlign: 'center'
  }
})