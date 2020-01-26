import { connect } from 'react-redux';
import DisplayBookComponent from '../components/display_book/display_book_component';
import * as Action from '../actions';

function mapStateToProps(state) {
    return {
        book: state.mainReducer.modifiedBook,
        userSpaces: state.mainReducer.userSpaces,
        bookReviews: state.mainReducer.modifiedBookReviews,
        userdata: state.mainReducer.userdata,
        queueArray: state.mainReducer.queueArray,
    };
}

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
export default connect(mapStateToProps, mapDispatchToProps)(DisplayBookComponent);
