import React from 'react';
import { requiresLogin } from '../hooks/hooks';
import * as DataTypes from './../../../shared/types';
import BookDisplayContainer from '../../containers/display_book_container';
import LoginComponent from '../social/login_component';
import ProfileSettingsComponent from './../settings/profile_settings_component';
import BooksFetcher from './fetchers/books_fetcher';
import SpacesFetcher from './fetchers/spaces_fetcher';
import debounce from 'lodash.debounce';

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
    booksFetcher: BooksFetcher;
    spacesFetcher: SpacesFetcher;

    constructor(props: Props) {
        super(props);
        this.refobject = React.createRef<HTMLDivElement>();
        this.booksFetcher = new BooksFetcher(0, 5, (filters: string[]) => props.getBooks(filters, []));
        this.spacesFetcher = new SpacesFetcher(0, 5, (filters: string[]) => props.getSpaces(filters));
    }

    private handleInitialContent() {
        const { id } = this.props.urlparams;
        this.booksFetcher = new BooksFetcher(0, 5, (filters: string[]) => this.props.getBooks(filters, []));
        this.spacesFetcher = new SpacesFetcher(0, 5, (filters: string[]) => this.props.getSpaces(filters));

        switch (id) {
            case DataTypes.AppPages.Books:
                this.booksFetcher.next(this.props.urlparams, true);
                break;
            case DataTypes.AppPages.Spaces:
            case undefined:
                this.spacesFetcher.next(this.props.urlparams, true);
                break;
        }
    }

    private handleScroll() {
        this.booksFetcher = new BooksFetcher(0, 5, (filters: string[]) => this.props.getBooks(filters, []));
        this.spacesFetcher = new SpacesFetcher(0, 5, (filters: string[]) => this.props.getSpaces(filters));

        const { id } = this.props.urlparams;

        switch (id) {
            case DataTypes.AppPages.Books:
                window.onscroll = debounce(() => this.booksFetcher.next(this.props.urlparams, false), 10);
                break;
            case DataTypes.AppPages.Spaces:
                window.onscroll = debounce(() => this.spacesFetcher.next(this.props.urlparams, false), 10);
                break;
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const pageChanged = this.props.urlparams.id !== prevProps.urlparams.id;
        if (pageChanged) {
            this.handleInitialContent();
            this.handleScroll();
        }
    }

    public componentWillMount() {
        this.handleInitialContent();
    }

    render() {
        const { id } = this.props.urlparams;

        switch (id) {
            case DataTypes.AppPages.Books:
                return (
                    <div ref={this.refobject} className={ClassNames.normal}>
                        {this.booksFetcher.render()}
                    </div>
                );
            case DataTypes.AppPages.Spaces:
                return (
                    <div ref={this.refobject} className={ClassNames.normal}>
                        {this.spacesFetcher.render()}
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
                return <div ref={this.refobject}>{this.spacesFetcher.render()}</div>;
        }
    }
}

export default requiresLogin(MainComponent, LoginComponent);
