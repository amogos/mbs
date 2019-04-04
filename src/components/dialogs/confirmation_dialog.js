import React, { Component } from 'react'
import { Button } from 'react-native'
import Popup from "reactjs-popup";
import EventBus from 'react-native-event-bus'

export default class ConfirmationDialog extends Component {
    state = {
        isDialogOpen: false,
        params: {message:"", button1:""}
    };

    componentDidMount() {
        EventBus.getInstance().addListener("onOperationCompleted", this.listener = data => {
            this.open(data);
        });
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener);
    }

    open = (data) => this.setState({ isDialogOpen: true, params: data.param })

    close = () => this.setState({ isDialogOpen: false })


    render() {
        return (
            <Popup open={this.state.isDialogOpen} position="center">{this.state.params.message}
                <Button title={this.state.params.button1} onPress={this.close} />
            </Popup>
        );
    }
}
