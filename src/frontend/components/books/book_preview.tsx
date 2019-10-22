import React from 'react';

export interface BookPreviewProps {
    visible: boolean;
    imageLinks: { smallThumbnail: string; thumbnail: string };
    title: string;
    authors: string[];
    description: string;
    publisher: string;
    publishedDate: string;
    pageCount: string;
}

export const NullBookPreviewProps: BookPreviewProps = {
    visible: false,
    imageLinks: { smallThumbnail: '', thumbnail: '' },
    title: '',
    authors: [],
    description: '',
    publisher: '',
    publishedDate: '',
    pageCount: '',
};

const BookPreview = (props: BookPreviewProps) => {
    if (!props.visible) return null;

    return (
        <div>
            <img width={200} alt="logo" src={props.imageLinks.thumbnail} />
            <p>Title: {props.title}</p>
            Author:
            {props.authors.map(item => (
                <span>{item}</span>
            ))}
            <p>Publisher: {props.publisher}</p>
            <span>({props.publishedDate}) </span>
            <p>Length: {props.pageCount}</p>
            <p>{props.description}</p>
        </div>
    );
};

export default BookPreview;
