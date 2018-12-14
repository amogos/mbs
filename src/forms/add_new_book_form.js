import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
export default class AddNewBookForm extends Component {
  constructor(props) {
    super(props);
    this.title = { title: 'title' };
    this.author = { author: 'author' };
    this.image = { image: 'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959' };
    this.state = { text: 'error...' };
  }
  onSaveButtonPressed() {

  }

  render() {
    return (
      <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text> title: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => this.setState({ text })}
          value={this.title.text}
        />

        <Text> author: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => this.setState({ text })}
          value={this.author.text} />

        <Text> image: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => { this.setState({ text }); this.image.image = text; }}
          value={this.image.text} />

        <img src={this.image.image} alt="new" width={64} height={64} mode='fit' allign='center' />
        <Button color="#000000"
          onPress={this.onSaveButtonPressed}
          style={{ height: 34, width: 320, padding: 2 }} i
          title="Save"
          accessibilityLabel="Save book"
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  inputField: {
    height: 34,
    width: 320,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 2,
    borderRadius: 6
  },
})