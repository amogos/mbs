import { connect } from 'react-redux';
import DisplayBookComponent from '../components/display_book/display_book_component';
import { bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        book: state.mainReducer.modifiedBook,
        bookReviews: state.mainReducer.modifiedBookReviews,
        userdata: state.mainReducer.userdata,
        queueArray: state.mainReducer.queueArray,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        returnBook: bookId => dispatch(bookAction.returnBook(bookId)),
        reviewBook: review => dispatch(bookAction.reviewBook(review)),
        askBook: (bookId, ownerId, duration) => dispatch(bookAction.askBook(bookId, ownerId, duration)),
        bookmarkBook: (bookId, onSuccess) => dispatch(bookAction.bookmarkBook(bookId, onSuccess)),
        likeReview: review => dispatch(bookAction.likeReview(review)),
        likeBook: book => dispatch(bookAction.likeBook(book)),
        dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayBookComponent);
