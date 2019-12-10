import { connect } from 'react-redux';
import BookFeedItemComponent from '../components/user_feed/book_feed_item';
import { bookAction } from '../actions';

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
export default connect(null, mapDispatchToProps)(BookFeedItemComponent);
