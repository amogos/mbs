import React, { Component } from 'react'
import { Text, StyleSheet, Button } from 'react-native'
export default class BookPlacement extends Component {
    OnAssignToMePressed = ()=> {
        this.props.callback();
    }
    BookAvailableForPlacement() {
        return this.props.holder !== '' && this.props.holder !== this.props.owner;
    }
    render() {
        let content;
        if (this.BookAvailableForPlacement()) {
            content = (<Text style={styles.description}> <br /> Owner: {this.props.owner}
                Holder: {this.props.holder}</Text>);
        } else {
            content = (<Text style={styles.description}> <br /> Owner: {this.props.owner}
                 <br/><Button style={styles.button} title="Assign to me" color="#000000ff" onPress={this.OnAssignToMePressed} />
                 </Text>);  
        }

        return (
            content
        );
    }
}

const styles = StyleSheet.create({
    button:
    {
       flex:2,
    },
    description:
    {
        fontSize: 14,
        color: 'gray',
        fontWeight: 'normal',
        flexDirection: 'column',
        justifyContent:'space-between'
    }
});