import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import * as DataTypes from '../../../shared/types';
import SpaceHolder from './../../containers/space_holder_container';
import { requiresCondition } from './../hooks/hooks';
import { AppPages, SpaceType } from '../../../shared/types';

interface Props extends RouteComponentProps {
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
    history: History;
}

const ListSpacesComponent = (props: Props) => {
    const onSpaceClicked = (space: SpaceType) => {
        props.history.push(`/${AppPages.Books}?space=${space.id}`);
    };
    const onSubscribeButoonClicked = (space: SpaceType) => {
        props.history.push(`/${AppPages.Subscription}?space=${space.id}`);
    };
    const onAddBookButtonClicked = (space: SpaceType) => {
        props.history.push(`/${AppPages.AddBook}?space=${space.id}`);
    };

    return (
        <div className="list_spaces_componen">
            <p className="thicker">All Spaces</p>
            <p className="thicker">My Spaces</p>
            {React.Children.toArray(
                props.userSpaces.map(item => (
                    <SpaceHolder
                        item={item}
                        onSpaceClicked={onSpaceClicked}
                        onSubscribeButoonClicked={onSubscribeButoonClicked}
                        onAddBookButtonClicked={onAddBookButtonClicked}
                    />
                )),
            )}
            <p />
            <p className="thicker">Other Spaces</p>
            {React.Children.toArray(
                props.otherSpaces.map(item => (
                    <SpaceHolder
                        item={item}
                        onSpaceClicked={onSpaceClicked}
                        onSubscribeButoonClicked={onSubscribeButoonClicked}
                        onAddBookButtonClicked={onAddBookButtonClicked}
                    />
                )),
            )}
        </div>
    );
};

function validProps(props: Props): boolean {
    return props.userSpaces !== null && props.otherSpaces !== null;
}

export default withRouter(requiresCondition(ListSpacesComponent, (props: Props) => validProps(props)));
