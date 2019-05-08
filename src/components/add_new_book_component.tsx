import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import * as DataTypes from "../types";

var defaultImage = 'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959';
var currentBook = {
  title: "",
  author: "",
  language: "",
  image: defaultImage,
  owner: DataTypes.nullUser,
  holder: DataTypes.nullUser
};

const AddNewBookComponent = (props: any) => {
  currentBook.holder = currentBook.owner = props.userdata;
  return (
    <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }} >
      <Text> title: </Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => { currentBook.title = text; }}
        value={currentBook.title} />
      <Text> language: </Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => { currentBook.language = text; }}
        value={currentBook.language} />
      <Text> author: </Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => { currentBook.author = text; }}
        value={currentBook.author} />
      <Text> image: </Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => { currentBook.image = text; }}
        value={currentBook.image} />
      <img src={currentBook.image} alt="new" width={64} height={64} />
      <Button color="#000000"
        onPress={() => onSaveButtonPressed(props)}
        title="Save"
        accessibilityLabel="Save book" />
    </View >
  )
}

export default AddNewBookComponent;

const onSaveButtonPressed = (props: any) => {
  props.addBook(currentBook);
  currentBook.title = currentBook.author = currentBook.language = "";
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