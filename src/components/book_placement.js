import React, { Component } from 'react'
import { Text, StyleSheet, Button } from 'react-native'
import firebase from 'firebase'

export default class BookPlacement extends Component {

    constructor(props) {
        super(props);
        this.holderRef = "";
        this.ownerRef = "";
        const { holder, owner } = this.props;
        firebase.database().ref("users/" + holder).once('value').then(function (snapshot) {
            this.holderRef = snapshot.val().email;
        });
        firebase.database().ref("users/" + owner).once('value').then(function (snapshot) {
            this.ownerRef = snapshot.val().email;
        });
    }

    onAssignToMePressed = () => {
        this.props.callback();
    }
    isBookAvailableForPlacement() {
        const { userdata } = this.props;
        return userdata.email !== this.ownerRef.email && this.props.holder === -1;
    }
    render() {
        let content;
        if (this.isBookAvailableForPlacement()) {
            content = (<Text style={styles.description}> <br /> Owner: {this.ownerRef.name}
                <br /><Button style={styles.button} title="Assign to me" color="#000000ff" onPress={this.onAssignToMePressed} />
            </Text>);

        } else {
            let holder = "";
            if (this.props.holder === -1) {
                holder = this.ownerRef.name;
            } else {
                holder = this.holderRef.name;
            }

            content = (<Text style={styles.description}> <br /> Owner: {this.ownerRef.name}
                <br /><Button style={styles.button} title={holder} color="#808080" />
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