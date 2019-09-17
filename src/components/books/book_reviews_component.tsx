import React from 'react';
import * as DataTypes from '../../types';
import { Comment, Avatar, Tooltip, Card, Button } from 'antd';
import moment from 'moment';

interface Props {
    bookId: number;
    reviews: DataTypes.BookReviewRecordType[];
    visible: boolean;
    onClick: () => void;
}

const BookReviewsComponent = (props: Props) => {
    if (props.reviews.length == 0) return null;
    if (props.visible === false) return null;

    return (
        <div className="customer_reviews">
            <Card
                title="Comments"
                extra={
                    <Button type="link" onClick={props.onClick}>
                        Close
                    </Button>
                }
            >
                {props.reviews.map(entry => (
                    <Comment
                        author={<a>Han Solo</a>}
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        }
                        content={<p>{entry.comment}</p>}
                        datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment().fromNow()}</span>
                            </Tooltip>
                        }
                    />
                ))}
            </Card>
        </div>
    );
};

export default BookReviewsComponent;
