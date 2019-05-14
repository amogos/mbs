import React, { useState } from 'react'
import { Button } from 'react-native'
import Popup from "reactjs-popup";
import * as DataTypes from '../types'

interface Props {
    message: DataTypes.ConfirmationDialogParams;
    confirmMessage(): void;
}

const ConfirmationDialogComponent = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');
    const [button, setButton] = useState('');
    let isMessgeValid = props.message && text !== props.message.text;

    if (isMessgeValid) {
        setText(props.message.text);
        setVisible(true);
        setButton(props.message.button1);
    }

    return (
        <Popup open={visible} position="top center"><div>{text}
            <Button title={button} onPress={() => {
                setVisible(false);
                setText('');
                setButton('');
                props.confirmMessage();
            }} /></div>
        </Popup>
    );
}


export default ConfirmationDialogComponent;