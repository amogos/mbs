import { connect } from 'react-redux';
import BookComponent from '../components/books_listing/book';
import * as Action from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        bookChangingId: state.mainReducer.bookChangingId,
        userSpaces: state.mainReducer.userSpaces,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: bookId => dispatch(Action.deleteBook(bookId)),
        askBook: (bookId, ownerId, duration) => dispatch(Action.askBook(bookId, ownerId, duration)),
        returnBook: bookId => dispatch(Action.returnBook(bookId)),
        reviewBook: review => dispatch(Action.reviewBook(review)),
        getReviewsForBook: (bookId, callback) => dispatch(Action.getReviewsForBook(bookId, callback)),
        likeBook: book => dispatch(Action.likeBook(book)),
        bookmarkBook: (bookId, onSuccess) => dispatch(Action.bookmarkBook(bookId, onSuccess)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookComponent);
