import React from 'react';
import Aux, { withStyle } from './../aux_component';

export interface BookPreviewProps {
    visible: boolean;
    imageLinks: { smallThumbnail: string; thumbnail: string };
    title: string;
    authors: string[];
    description: string;
    publisher: string;
    publishedDate: string;
    pageCount: string;
    language: string;
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
    language: '',
};

const BookPreview = (props: BookPreviewProps) => {
    if (!props.visible) return null;

    return (
        <Aux>
            <img alt="logo" src={props.imageLinks.smallThumbnail} />

            <div className="details">
                Title: {props.title} <br />
                Language: {props.language.toUpperCase()} <br />
                <span>Author:</span>
                {props.authors.map(item => (
                    <span>{item}</span>
                ))}
                <br />
                Publisher: {props.publisher}
                <span>({props.publishedDate}) </span>
                <br />
                Length: {props.pageCount}
            </div>
            <div className="description">{props.description}</div>
        </Aux>
    );
};

export default withStyle(BookPreview, 'book_preview');
