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
    };
}

const mapDispatchToProps = dispatch => {
    return {
        displayBook: bookId => dispatch(bookAction.displayBook(bookId)),
        loginUser: (user, onError) => dispatch(socialAction.loginUser(user, onError)),
        getBooks: (filters, callback) => dispatch(pageAction.getBooks(filters, callback)),
        getSpaces: filters => dispatch(pageAction.getSpaces(filters)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
