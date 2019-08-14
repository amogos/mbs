import React, { useState } from 'react';
import { Comment, Form, Avatar, Input, Modal, Rate } from 'antd';
import * as DataTypes from '../types';
import * as StringConstants from './../constants/string_constant';

const { TextArea } = Input;

interface EditorProps {
    onChange(e: any): void;
    value: string;
}

const Editor = (props: EditorProps) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={props.onChange} value={props.value} />
        </Form.Item>
    </div>
);

interface Props {
    userdata: DataTypes.UserRecordType;
    visible: boolean;
    onClosed(): void;
}

const BookContentRating = (props: Props) => {
    const [value, setValue] = useState('');
    const [contentRating, setContentRating] = useState(0);
    const [stateRating, setStateRating] = useState(0);

    const description = ['terrible', 'bad', 'normal', 'good', 'excellent'];

    const handleEditorChange = (e: any) => setValue(e.target.value);
    const handleContentRaterChange = (value: number) => setContentRating(value);
    const handleStateRaterChange = (value: number) => setStateRating(value);

    const handleSubmit = () => {
        setValue('');
        setContentRating(0);
        setStateRating(0);
    };

    return (
        <Modal
            title={StringConstants.default.MYBOOKSHELVE_RATING_TITLE}
            visible={props.visible}
            onOk={() => {
                handleSubmit();
                props.onClosed();
            }}
            onCancel={() => {
                props.onClosed();
            }}
        >
            <p>
                Rate State: <Rate tooltips={description} onChange={handleStateRaterChange} value={stateRating} />
            </p>
            <p>
                Rate Content: <Rate tooltips={description} onChange={handleContentRaterChange} value={contentRating} />
            </p>
            <Comment
                avatar={<Avatar src={props.userdata.value.picture} alt="Han Solo" />}
                content={<Editor onChange={handleEditorChange} value={value} />}
            />
        </Modal>
    );
};

export default BookContentRating;
