import React from 'react';
import { Rate, Button } from 'antd';
import * as StringConstant from '../../constants/string_constant';

interface Props {
    contentRating: number | undefined;
    numReviews: number | undefined;
    onClick: () => void;
}

const BookRatingButton = (param: Props) => {
    return (
        <div className="review_buttons">
            <Button type="link" onClick={param.onClick}>
                <Rate allowHalf disabled defaultValue={param.contentRating} />
                {param.numReviews} {StringConstant.default.MYBOOKSHELVE_CUSTOMER_REVIEWS}
            </Button>
        </div>
    );
};

export default BookRatingButton;
