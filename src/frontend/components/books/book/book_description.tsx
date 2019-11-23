import React, { useState } from 'react';
import Aux, { withStyle } from '../../aux_component';
import { Button } from 'antd';

interface Props {
    description: string;
    length: number;
}

const BookDescription = (props: Props) => {
    const [expandedText, setExpandedText] = useState(false);
    const contentText = expandedText ? props.description : props.description.substr(0, props.length);
    const buttonText = expandedText ? 'show less' : 'show more';

    return (
        <Aux>
            <p>
                {contentText}
                {props.description.length > props.length ? (
                    <Button type="link" onClick={() => setExpandedText(!expandedText)}>
                        {buttonText}
                    </Button>
                ) : null}
            </p>
            <br />
        </Aux>
    );
};

export default withStyle(BookDescription, 'book_description');
