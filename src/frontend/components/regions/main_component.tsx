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
    refobject: React.RefObject<HTMLDivElement>;
    scrollspeed: number;

    constructor(props: Props) {
        super(props);
        this.refobject = React.createRef<HTMLDivElement>();
        this.scrollspeed = 1;
    }

    private UpdateScrollSpeed() {
        const element = this.refobject.current;

        if (!element) return;
        if (!element.parentElement) return;

        let maxScrollHeight = element.scrollHeight;

        for (let i = 0; i < element.parentElement.children.length; i++) {
            const scrollHeight = element.parentElement.children[i].scrollHeight;
            if (scrollHeight > maxScrollHeight) maxScrollHeight = scrollHeight;
        }
        this.scrollspeed = element.scrollHeight / maxScrollHeight;
        console.log(
            `el = ${document.documentElement.scrollTop} max = ${maxScrollHeight} doc = ${element.parentElement.offsetHeight}`,
        );
        console.log(`${document.documentElement.clientHeight}`);
    }

    shouldComponentUpdate(nextProps: Props, nextState: {}) {
        return nextProps.urlparams !== this.props.urlparams || nextProps.userdata !== this.props.userdata;
    }

    private updateStyle() {
        this.UpdateScrollSpeed();
        const element = this.refobject.current;
        if (!element) return;
        const top = -document.documentElement.scrollTop * this.scrollspeed;
        element.style.setProperty('top', `${top}px`);
    }

    public componentDidMount() {
        window.addEventListener('scroll', () => this.updateStyle());
    }

    render() {
        const { id } = this.props.urlparams;

        switch (id) {
            case 'books':
                return (
                    <div ref={this.refobject} className="main_component">
                        {BooksList(this.props)}{' '}
                    </div>
                );
            case 'spaces':
                return (
                    <div ref={this.refobject} className="main_component">
                        {SpacesList(this.props)}
                    </div>
                );
            case 'book':
                return (
                    <div ref={this.refobject} className="main_component">
                        {DisplayBookDetails(this.props)}
                    </div>
                );
            case 'settings':
                return (
                    <div ref={this.refobject} className="main_component">
                        <ProfileSettingsComponent />
                    </div>
                );
            default:
                return <div ref={this.refobject}>{SpacesList(this.props)}</div>;
        }
    }
}

export default requiresLogin(MainComponent, LoginComponent);
