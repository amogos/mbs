import React, { Component } from 'react'
import { Text, StyleSheet, Button } from 'react-native'

export default class BookPlacement extends Component {

    onAssignToMePressed = () => {
        this.props.callback();
    }
    isBookAvailableForPlacement() {
        const { userdata, holder, owner } = this.props;
        return userdata.email !== owner.email && holder.email === "";
    }
    render() {
        let content;
        const { holder, owner } = this.props;

        if (this.isBookAvailableForPlacement()) {
            content = (<Text style={styles.description}> <br /> Owner: {owner.name}
                <br /><Button style={styles.button} title="Assign to me" color="#000000ff" onPress={this.onAssignToMePressed} />
            </Text>);

        } else {
            content = (<Text style={styles.description}> <br /> Owner: {owner.name}
                <br /><Button style={styles.button} title={holder.email === "" ? owner.name : holder.name} color="#808080" />
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