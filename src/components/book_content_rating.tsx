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
    book: DataTypes.BookRecordType;
    reviewBook(bookId: number, comment: string, contentScore: number, stateScore: number): void;
    returnBook(bookId: number): void;
}

const BookContentRating = (props: Props) => {
    const [comment, setComment] = useState('');
    const [contentRating, setContentRating] = useState(0);
    const [stateRating, setStateRating] = useState(0);
    const description = ['terrible', 'bad', 'normal', 'good', 'excellent'];
    const handleEditorChange = (e: any) => setComment(e.target.value);
    const handleContentRaterChange = (value: number) => setContentRating(value);
    const handleStateRaterChange = (value: number) => setStateRating(value);
    const validFields = () => comment !== '' && contentRating > 0 && stateRating > 0;

    const clearFields = () => {
        setComment('');
        setContentRating(0);
        setStateRating(0);
    };

    const onCancel = () => {
        props.onClosed();
    };

    const onOk = () => {
        if (!validFields) return;
        props.reviewBook(props.book.id, comment, contentRating, stateRating);
        props.book.value.holder = DataTypes.NullUser;
        props.returnBook(props.book.id);
        clearFields();
        props.onClosed();
    };

    return (
        <Modal
            title={StringConstants.default.MYBOOKSHELVE_RATING_TITLE}
            visible={props.visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <p>
                {StringConstants.default.MYBOOKSHELVE_RATING_STATE}
                <Rate tooltips={description} onChange={handleStateRaterChange} value={stateRating} />
            </p>
            <p>
                {StringConstants.default.MYBOOKSHELVE_RATING_CONTENT}
                <Rate tooltips={description} onChange={handleContentRaterChange} value={contentRating} />
            </p>
            <Comment
                avatar={<Avatar src={props.userdata.value.picture} alt="Han Solo" />}
                content={<Editor onChange={handleEditorChange} value={comment} />}
            />
        </Modal>
    );
};

export default BookContentRating;
