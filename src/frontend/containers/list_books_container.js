import { connect } from 'react-redux';
import ListBooksComponent from '../components/books/list_books_component';
import { bookAction } from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        bookChangingId: state.mainReducer.bookChangingId,
        action: state.mainReducer.action,
        booksArray: state.mainReducer.booksArray,
        queueArray: state.mainReducer.queueArray,
        urlparams: state.mainReducer.urlparams,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        displayBook: bookId => dispatch(bookAction.displayBook(bookId)),
        deleteBook: bookId => dispatch(bookAction.deleteBook(bookId)),
        askBook: (bookId, ownerId, duration) => dispatch(bookAction.askBook(bookId, ownerId, duration)),
        returnBook: bookId => dispatch(bookAction.returnBook(bookId)),
        reviewBook: review => dispatch(bookAction.reviewBook(review)),
        getReviewsForBook: (bookId, callback) => dispatch(bookAction.getReviewsForBook(bookId, callback)),
        likeBook: book => dispatch(bookAction.likeBook(book)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBooksComponent);
