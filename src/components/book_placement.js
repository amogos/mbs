import React, { Component } from 'react'
import { Text, StyleSheet, Button } from 'react-native'

export default class BookPlacement extends Component {
    isBookAvailableForPlacement() {
        let { context, value } = this.props;
        return context.userdata.email !== value.owner.email && value.holder.email === "";
    }
    
    render() {
        let content;
        let { context, value } = this.props;

        if (this.isBookAvailableForPlacement()) {
            content = (<Text style={styles.description}> <br /> Owner: {value.owner.name}
                <br /><Button style={styles.button} title="Assign to me" color="#000000ff"
                    onPress={context.callbacks.onBookAsignedToMe} />
            </Text>);

        } else {
            content = (<Text style={styles.description}> <br /> Owner: {value.owner.name}
                <br /><Button style={styles.button} title={value.holder.email === "" ?
                    value.owner.name : value.holder.name} color="#808080" />
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
        flex: 2,
    },
    description:
    {
        fontSize: 14,
        color: 'gray',
        fontWeight: 'normal',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});