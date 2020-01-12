import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';
import { pageAction, socialAction, bookAction } from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
        booksArray: state.mainReducer.booksArray,
        userSpaces: state.mainReducer.userSpaces,
        otherSpaces: state.mainReducer.otherSpaces,
        userfeed: state.mainReducer.userfeed,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        displayBook: bookId => dispatch(bookAction.displayBook(bookId)),
        signUpUser: user => dispatch(socialAction.signUpUser(user)),
        loginUser: (user, onError) => dispatch(socialAction.loginUser(user, onError)),
        getBooks: (filters, callback) => dispatch(pageAction.getBooks(filters, callback)),
        getSpaces: filters => dispatch(pageAction.getSpaces(filters)),
        getFeeds: (filters, callback) => dispatch(pageAction.getFeeds(filters, callback)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
