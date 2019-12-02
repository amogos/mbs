import React, { useState } from 'react';
import { Aux } from './../../hooks/hooks';
import { Button } from 'antd';
import * as DataTypes from './../../../../shared/types';

interface Props {
    book: DataTypes.BookRecordType;
    likeBook(book: DataTypes.BookRecordType): void;
}

const LikeBookComponent = (props: Props) => {
    const [likes, setLikes] = useState(props.book.likes);

    const likeBook = () => {
        props.book.likes++;
        setLikes(props.book.likes);
        props.likeBook(props.book);
    };
    const likesStatus = likes > 0 ? `${likes} likes` : '';
    return (
        <Aux>
            {likesStatus}
            <Button onClick={likeBook}>Like</Button>
        </Aux>
    );
};
export default LikeBookComponent;
