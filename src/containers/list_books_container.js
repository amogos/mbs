import { connect } from 'react-redux';
import ListBooksComponent from '../components/list_books_component';
import { bookAction, pageAction } from './../actions';

function mapStateToProps(state) {
    return {
        action: state.mainReducer.action,
        booksArray: state.mainReducer.booksArray,
        userdata: state.mainReducer.userdata,
        bookChangingId: state.mainReducer.bookChangingId,
        action: state.mainReducer.action,
        queueArray: state.mainReducer.queueArray,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: bookId => dispatch(bookAction.deleteBook(bookId)),
        askBook: (bookId, ownerId, duration) => dispatch(bookAction.askBook(bookId, ownerId, duration)),
        returnBook: bookId => dispatch(bookAction.returnBook(bookId)),
        gotoListBooks: filters => dispatch(pageAction.gotoListBooks(filters)),
        reviewBook: (bookId, comment, contentScore, stateScore) =>
            dispatch(bookAction.reviewBook(bookId, comment, contentScore, stateScore)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListBooksComponent);
