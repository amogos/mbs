import React from 'react';
import { requiresLogin } from '../hooks/hooks';
import debounce from 'lodash.debounce';
import * as DataTypes from './../../../shared/types';
import ListBooksContainer from '../../containers/list_books_container';
import ListSpacesContainer from '../../containers/list_spaces_container';
import BookDisplayContainer from '../../containers/display_book_container';
import LoginComponent from '../social/login_component';
import ProfileSettingsComponent from './../settings/profile_settings_component';

interface Props {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
    booksArray: DataTypes.BookRecordType[];
    userSpaces: DataTypes.SpaceType[];
    otherSpaces: DataTypes.SpaceType[];
    signUpUser(userInfo: DataTypes.UserValueType): void;
    displayBook(bookId: number): void;
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    getBooks(filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]): void;
    getSpaces(filters: string[]): void;
}

interface Navigation {
    index: number;
    limit: number;
}

const navigation: Navigation = { index: 0, limit: 5 };

function nextBooks(props: Props, force: boolean) {
    if (force) navigation.index = 0;

    const endOfContent =
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;

    if (endOfContent || force) {
        const queryFilters: string[] = [];

        if (props.urlparams.query.category) {
            queryFilters.push(`category=${props.urlparams.query.category}`);
        }

        if (props.urlparams.query.space) {
            queryFilters.push(`space=${props.urlparams.query.space}`);
        }

        queryFilters.push(`_start=${navigation.index}`);
        queryFilters.push(`_limit=${navigation.limit}`);
        navigation.index += navigation.limit;
        props.getBooks(queryFilters, []);
    }
}

function BooksList(props: Props) {
    window.onscroll = debounce(() => nextBooks(props, false), 100);
    nextBooks(props, true);
    return <ListBooksContainer />;
}

function nextSpaces(props: Props, force: boolean) {
    if (force) {
        navigation.index = 0;
    }

    const endOfContent =
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;

    if (force || endOfContent) {
        const queryFilters: string[] = [];
        queryFilters.push(`_start=${navigation.index}`);
        queryFilters.push(`_limit=${navigation.limit}`);
        navigation.index += navigation.limit;
        props.getSpaces(queryFilters);
    }
}

function SpacesList(props: Props) {
    window.onscroll = debounce(() => nextSpaces(props, false), 100);
    nextSpaces(props, true);
    return <ListSpacesContainer />;
}

function DisplayBookDetails(props: Props) {
    const bookId = props.urlparams.query.id as number;
    props.displayBook(bookId);
    return <BookDisplayContainer />;
}

enum ClassNames {
    normal = 'main_component',
}

class MainComponent extends React.Component<Props, {}> {
    refobject: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.refobject = React.createRef<HTMLDivElement>();
    }

    render() {
        const { id } = this.props.urlparams;

        switch (id) {
            case DataTypes.AppPages.Books:
                return (
                    <div ref={this.refobject} className={ClassNames.normal}>
                        {BooksList(this.props)}{' '}
                    </div>
                );
            case DataTypes.AppPages.Spaces:
                return (
                    <div ref={this.refobject} className={ClassNames.normal}>
                        {SpacesList(this.props)}
                    </div>
                );
            case DataTypes.AppPages.Book:
                return (
                    <div ref={this.refobject} className={ClassNames.normal}>
                        {DisplayBookDetails(this.props)}
                    </div>
                );
            case DataTypes.AppPages.Settings:
                return (
                    <div ref={this.refobject} className={ClassNames.normal}>
                        <ProfileSettingsComponent />
                    </div>
                );
            default:
                return <div ref={this.refobject}>{SpacesList(this.props)}</div>;
        }
    }
}

export default requiresLogin(MainComponent, LoginComponent);
