import React from 'react';
import { withStyle, requiresLogin } from '../hooks/hooks';
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

class MainComponent extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    shouldComponentUpdate(nextProps: Props, nextState: {}) {
        return nextProps.urlparams !== this.props.urlparams || nextProps.userdata !== this.props.userdata;
    }

    render() {
        const { id } = this.props.urlparams;

        switch (id) {
            case 'books':
                return BooksList(this.props);
            case 'spaces':
                return SpacesList(this.props);
            case 'book':
                return DisplayBookDetails(this.props);
            case 'settings':
                return <ProfileSettingsComponent />;
            default:
                return SpacesList(this.props);
        }
    }
}

export default requiresLogin(withStyle(MainComponent, 'main_component'), LoginComponent);
