import { connect } from 'react-redux';
import BookComponent from '../components/books_listing/book';
import { bookAction } from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        bookChangingId: state.mainReducer.bookChangingId,
        userSpaces: state.mainReducer.userSpaces,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: bookId => dispatch(bookAction.deleteBook(bookId)),
        askBook: (bookId, ownerId, duration) => dispatch(bookAction.askBook(bookId, ownerId, duration)),
        returnBook: bookId => dispatch(bookAction.returnBook(bookId)),
        reviewBook: review => dispatch(bookAction.reviewBook(review)),
        getReviewsForBook: (bookId, callback) => dispatch(bookAction.getReviewsForBook(bookId, callback)),
        likeBook: book => dispatch(bookAction.likeBook(book)),
        bookmarkBook: (bookId, onSuccess) => dispatch(bookAction.bookmarkBook(bookId, onSuccess)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
