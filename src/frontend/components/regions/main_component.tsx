import React from 'react';
import { requiresLogin } from '../hooks/hooks';
import * as DataTypes from './../../../shared/types';
import BookDisplayContainer from '../../containers/display_book_container';
import LoginComponent from '../social/login_component';
import ProfileSettingsComponent from './../settings/profile_settings_component';
import BooksFetcher from './fetchers/books_fetcher';
import SpacesFetcher from './fetchers/spaces_fetcher';
import FeedFetcher from './fetchers/feed_fetcher';
import debounce from 'lodash.debounce';
import { ContentHolder } from './fetchers/content_fetcher';

interface Props {
    userdata: DataTypes.UserRecordType;
    urlparams: DataTypes.UrlParms;
    booksArray: DataTypes.BookRecordType[];
    userSpaces: DataTypes.SpaceType[];
    otherSpaces: DataTypes.SpaceType[];
    userFeed: DataTypes.UserFeedRecordType[];
    signUpUser(userInfo: DataTypes.UserValueType): void;
    displayBook(bookId: number): void;
    loginUser(userInfo: DataTypes.UserValueType, onError?: () => void): void;
    getBooks(filters: string[], callbacks: ((books: DataTypes.BookRecordType[]) => void)[]): void;
    getSpaces(filters: string[], callbacks: ((result: DataTypes.Spaces) => void)[]): void;
    getFeeds(filters: string[], callbacks: ((feeds: DataTypes.UserFeedRecordType[]) => void)[]): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

function DisplayBookDetails(props: Props) {
    const bookId = props.urlparams.query.id as number;
    props.displayBook(bookId);
    return <BookDisplayContainer />;
}

enum ClassNames {
    normal = 'main_component',
}

class MainComponent extends React.Component<Props, State> implements ContentHolder {
    booksFetcher: BooksFetcher;
    spacesFetcher: SpacesFetcher;
    feedFetcher: FeedFetcher;

    constructor(props: Props) {
        super(props);
        this.booksFetcher = new BooksFetcher(0, 10, (filters: string[]) => props.getBooks(filters, []));
        this.spacesFetcher = new SpacesFetcher(0, 10, (filters: string[]) => props.getSpaces(filters, []));
        this.feedFetcher = new FeedFetcher(0, 10, (filters: string[]) => props.getFeeds(filters, []));
        this.handleScroll();
    }

    getContentHolder(): any[] {
        const { id } = this.props.urlparams;
        switch (id) {
            case DataTypes.AppPages.Books:
                return this.props.booksArray;
            case DataTypes.AppPages.Feed:
                return this.props.userFeed;
        }
        return this.props.otherSpaces;
    }

    private handleScroll() {
        this.booksFetcher = new BooksFetcher(0, 10, (filters: string[]) => this.props.getBooks(filters, []));
        this.spacesFetcher = new SpacesFetcher(0, 10, (filters: string[]) => this.props.getSpaces(filters, []));
        this.feedFetcher = new FeedFetcher(0, 10, (filters: string[]) => this.props.getFeeds(filters, []));

        let { id } = this.props.urlparams;
        if (id === undefined) id = DataTypes.AppPages.Spaces;

        switch (id) {
            case DataTypes.AppPages.Books:
                this.booksFetcher.next(this.props.urlparams, true, this);
                window.onscroll = debounce(() => this.booksFetcher.next(this.props.urlparams, false, this), 10);
                break;
            case DataTypes.AppPages.Spaces:
                this.spacesFetcher.next(this.props.urlparams, true, this);
                this.feedFetcher.next(this.props.urlparams, true, this);
                window.onscroll = debounce(() => this.spacesFetcher.next(this.props.urlparams, false, this), 10);
                break;
            case DataTypes.AppPages.Feed:
                this.feedFetcher.next(this.props.urlparams, true, this);
                window.onscroll = debounce(() => this.feedFetcher.next(this.props.urlparams, false, this), 10);
                break;
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const pageChanged = this.props.urlparams.id !== prevProps.urlparams.id;
        const queryChanged = this.props.urlparams.query !== prevProps.urlparams.query;
        if (!queryChanged && !pageChanged) return;
        this.handleScroll();
    }

    render() {
        let { id } = this.props.urlparams;
        if (id === undefined) id = DataTypes.AppPages.Spaces;

        switch (id) {
            case DataTypes.AppPages.Books:
                return <div className={ClassNames.normal}>{this.booksFetcher.render()}</div>;
            case DataTypes.AppPages.Spaces:
                return <div className={ClassNames.normal}>{this.spacesFetcher.render()}</div>;
            case DataTypes.AppPages.Book:
                return <div className={ClassNames.normal}>{DisplayBookDetails(this.props)}</div>;
            case DataTypes.AppPages.Settings:
                return (
                    <div className={ClassNames.normal}>
                        <ProfileSettingsComponent />
                    </div>
                );
            case DataTypes.AppPages.Feed: {
                return <div className={ClassNames.normal}>{this.feedFetcher.render()}</div>;
            }
            case DataTypes.AppPages.Subscription: {
                return <div>Edit subscription</div>;
            }
            default:
                return <div></div>;
        }
    }
}

export default requiresLogin(MainComponent, LoginComponent);
