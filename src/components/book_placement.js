import React, { Component } from 'react'
import { Text, StyleSheet, Button } from 'react-native'

export default class BookPlacement extends Component {
    onAssignToMePressed = ()=> {
        this.props.callback();
    }
    isBookAvailableForPlacement() {
        const {holder, owner, userdata} = this.props;
        return userdata.name !== owner && holder ==='';
    }
    render() {
        let content;
        if (this.isBookAvailableForPlacement()) {
            content = (<Text style={styles.description}> <br /> Owner: {this.props.owner}
                <br/><Button style={styles.button} title="Assign to me" color="#000000ff" onPress={this.onAssignToMePressed} />
                </Text>);  
            
        } else {
            let holder =  this.props.holder;
            if (holder ==='')
                holder = this.props.owner;

            content = (<Text style={styles.description}> <br /> Owner: {this.props.owner}
                  <br/><Button style={styles.button} title={holder} color="#808080" />
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