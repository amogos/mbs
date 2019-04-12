import React from 'react'
import { Button } from 'react-native'
import Popup from "reactjs-popup";
import EventBus from './../../utils/event_bus'
import * as Types from './../../types'

interface Props { }

interface State {
    isDialogOpen: boolean,
    params: Types.ConfirmationDialogParams
}

export default class ConfirmationDialog extends React.Component<Props, State> {
    state = {
        isDialogOpen: false,
        params: { message: "", button1: "" }
    };

    listener: (data: Types.ConfirmationDialogParams) => void;

    constructor(props: Props) {
        super(props);
        this.listener = (data: Types.ConfirmationDialogParams) => { }
    }

    componentDidMount() {
        EventBus.getInstance().addListener("onOperationCompleted", this.listener = data => {
            this.open(data);
        });
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener);
    }

    open = (data: Types.ConfirmationDialogParams) => this.setState({ isDialogOpen: true, params: data })

    close = () => this.setState({ isDialogOpen: false })


    render() {
        return (
            <Popup open={this.state.isDialogOpen} position="top center"><div>{this.state.params.message}
                <Button title={this.state.params.button1} onPress={this.close} /></div>
            </Popup>
        );
    }
}
