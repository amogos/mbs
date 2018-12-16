import React, { Component } from 'react'
import { Text, StyleSheet, Button } from 'react-native'
export default class BookPlacement extends Component {
    onAssignToMePressed = ()=> {
        this.props.callback();
    }
    isBookAvailableForPlacement() {
        return this.props.holder !== '' && this.props.holder !== this.props.owner;
    }
    render() {
        let content;
        if (this.isBookAvailableForPlacement()) {
            content = (<Text style={styles.description}> <br /> Owner: {this.props.owner}
                Holder: {this.props.holder}</Text>);
        } else {
            content = (<Text style={styles.description}> <br /> Owner: {this.props.owner}
                 <br/><Button style={styles.button} title="Assign to me" color="#000000ff" onPress={this.onAssignToMePressed} />
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