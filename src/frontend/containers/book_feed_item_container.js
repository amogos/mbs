import { connect } from 'react-redux';
import BookFeedItemComponent from '../components/user_feed/book_feed_item';
import * as Action from '../actions';

const mapDispatchToProps = dispatch => {
    return {
        returnBook: bookId => dispatch(Action.returnBook(bookId)),
        reviewBook: review => dispatch(Action.reviewBook(review)),
        askBook: (bookId, ownerId, duration) => dispatch(Action.askBook(bookId, ownerId, duration)),
        bookmarkBook: (bookId, onSuccess) => dispatch(Action.bookmarkBook(bookId, onSuccess)),
        likeReview: review => dispatch(Action.likeReview(review)),
        likeBook: book => dispatch(Action.likeBook(book)),
        dispatch,
    };
};
export default connect(null, mapDispatchToProps)(BookFeedItemComponent);
