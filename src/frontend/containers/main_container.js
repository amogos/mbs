import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';
import { pageAction, socialAction, bookAction, spaceAction } from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
        booksArray: state.mainReducer.booksArray,
        userSpaces: state.mainReducer.userSpaces,
        otherSpaces: state.mainReducer.otherSpaces,
        userFeed: state.mainReducer.userFeed,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        displayBook: bookId => dispatch(bookAction.displayBook(bookId)),
        signUpUser: user => dispatch(socialAction.signUpUser(user)),
        loginUser: (user, onError) => dispatch(socialAction.loginUser(user, onError)),
        getBooks: (filters, callbacks) => dispatch(pageAction.getBooks(filters, callbacks)),
        getSpaces: (filters, callbacks) => dispatch(pageAction.getSpaces(filters, callbacks)),
        getFeeds: (filters, callbacks) => dispatch(pageAction.getFeeds(filters, callbacks)),
        enterSubscribeSpace: spaceId => dispatch(spaceAction.enterSubscribeSpace(spaceId)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
