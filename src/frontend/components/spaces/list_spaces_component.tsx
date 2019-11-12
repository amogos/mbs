import React from 'react';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import SpaceHolder from './space_holder';
import Aux, { withStyle } from './../aux_component';

interface Props {
    userSpaces: DataTypes.SpaceType[];
    otherSpaces: DataTypes.SpaceType[];
    userdata: DataTypes.UserRecordType;
    languages: DataTypes.LanguageRecordType[];
    categories: DataTypes.CategoryRecordType[];
    addBook(book: DataTypes.BookValueType, onSuccess: () => void): void;
    getBooks(filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]): void;
    getBookDescription(
        isbn10: string,
        isbn13: string,
        callback: (result: DataTypes.BookDescriptionRecordType) => void,
    ): void;
    followSpace: (spaceId: number, callback: () => void) => void;
    unfollowSpace: (spaceId: number, callback: () => void) => void;
    history: any;
}

const ListSpacesComponent = (props: Props) => {
    if (!props.userSpaces || !props.otherSpaces) return null;

    const onSpaceClicked = (spaceId: number) => {
        props.history.push(`/books?space=${spaceId}`);
    };

    function onChange(slideNumber: number) {}

    return (
        <Aux>
            <p className="thicker">All Spaces</p>
            <p className="thicker">My Spaces</p>
            {props.userSpaces.map(item => (
                <SpaceHolder key={item.id} {...props} item={item} onClick={() => onSpaceClicked(item.id)} />
            ))}
            <p />
            <p className="thicker">Other Spaces</p>
            {props.otherSpaces.map(item => (
                <SpaceHolder key={item.id} {...props} item={item} onClick={() => onSpaceClicked(item.id)} />
            ))}
        </Aux>
    );
};

export default withRouter(withStyle(ListSpacesComponent, 'list_spaces_component'));
