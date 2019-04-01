import React, { Component } from 'react'
import { Text, StyleSheet, Button } from 'react-native'

export default class BookPlacement extends Component {
    isBookAvailableForPlacement() {
        const { userdata, value} = this.props;
        return userdata.email !== value.owner.email && value.holder.email === "";
    }
    render() {
        let content;
        const { holder, owner } = this.props.value;

        if (this.isBookAvailableForPlacement()) {
            content = (<Text style={styles.description}> <br /> Owner: {owner.name}
                <br /><Button style={styles.button} title="Assign to me" color="#000000ff"
                    onPress={this.props.callbacks.onBookAsignedToMe} />
            </Text>);

        } else {
            content = (<Text style={styles.description}> <br /> Owner: {owner.name}
                <br /><Button style={styles.button} title={holder.email === "" ?
                    owner.name : holder.name} color="#808080" />
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