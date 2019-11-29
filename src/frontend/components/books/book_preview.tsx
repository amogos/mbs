import React from 'react';
import { Aux, withStyle } from './../hooks/hooks';

export interface BookIsbn {
    type: string;
    identifier: string;
}
export const NullIsbn: BookIsbn = {
    type: '',
    identifier: '',
};

export interface BookPreviewProps {
    visible: boolean;
    imageLinks: { smallThumbnail: string; thumbnail: string };
    title: string;
    subtitle: string;
    authors: string[];
    description: string;
    publisher: string;
    publishedDate: string;
    pageCount: string;
    language: string;
    categories: string[];
    industryIdentifiers: BookIsbn[];
}

export const NullBookPreviewProps: BookPreviewProps = {
    visible: false,
    imageLinks: { smallThumbnail: '', thumbnail: '' },
    title: '',
    subtitle: '',
    authors: [],
    description: '',
    publisher: '',
    publishedDate: '',
    pageCount: '',
    language: '',
    categories: [],
    industryIdentifiers: [NullIsbn, NullIsbn],
};

const BookPreview = (props: BookPreviewProps) => {
    if (!props.visible) return null;

    return (
        <Aux>
            <img alt="logo" src={props.imageLinks ? props.imageLinks.smallThumbnail : ''} />

            <div className="details">
                Title: {props.title} <br />
                Language: {props.language.toUpperCase()} <br />
                <span>Author:</span>
                {props.authors ? props.authors.map(item => <span>{item}</span>) : 'NAN'}
                <br />
                Publisher: {props.publisher}
                <span>({props.publishedDate}) </span>
                <br />
                Category: {props.categories[0]}
                <br />
                Length: {props.pageCount ? props.pageCount : 'NAN'}
            </div>
            <div className="description">{props.description}</div>
        </Aux>
    );
};

export default withStyle(BookPreview, 'book_preview');
