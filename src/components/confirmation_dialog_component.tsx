import React, { useState } from 'react'
import { Button } from 'react-native'
import Popup from "reactjs-popup";
import * as DataTypes from '../types'

const ConfirmationDialogComponent = (props: any) => {
    const [isDialogOpen, setIsDilogOpen] = useState(false);
    const [text, setText] = useState('');

    let isMessgeValid = props.message.text && props.message.text !== '' && text != props.message.text;

    if (isMessgeValid) {
        setText(props.message.text);
        setIsDilogOpen(true);
    }

    return (
        <Popup open={isDialogOpen} position="top center"><div>{props.message}
            <Button title={props.message.button1} onPress={() => setIsDilogOpen(false)} /></div>
        </Popup>
    );
}


export default ConfirmationDialogComponent;