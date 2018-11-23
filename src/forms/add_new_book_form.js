import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
export default class AddNewBookForm extends Component {
  constructor(props) {
    super(props);
    this.title = { title: 'title' };
    this.author = { author: 'author' };
    this.state = { text: 'error...' };
  }
  onSaveButtonPressed()
  {

  }
  render() {
    return (
      <View >
        <Text>title:</Text>
        <TextInput
          style={{ height: 34, width: 320, borderColor: 'gray', borderWidth: 1, padding: 2 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.title.text}
        />
        <Text>author:</Text>
        <TextInput
          style={{ height: 34, width: 320, borderColor: 'gray', borderWidth: 1, padding: 2 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.author.text}
        />
        <Button
          onPress={this.onSaveButtonPressed}
          style={{ height: 34, width: 320, padding: 2 }}
          title="Save"
          color="#841584"
          
          accessibilityLabel="Save book"
        />
      </View>
    )
  }
}
