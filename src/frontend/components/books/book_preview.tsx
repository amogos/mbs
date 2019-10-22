import React from 'react';

interface Props {
    visible: boolean;
    image: string;
    title: string;
    authors: string[];
    description: string;
}

const BookPreview = (props: Props) => {
    if (!props.visible) return null;

    return (
        <div>
            <img width={200} alt="logo" src={props.image} />
            <p>Title: {props.title}</p>
            Author:
            {props.authors.map(item => (
                <span>{item}</span>
            ))}
            <p>{props.description}</p>
        </div>
    );
};

export default BookPreview;
