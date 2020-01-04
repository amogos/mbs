import { connect } from 'react-redux';
import BookStateComponent from '../components/book_actions/book_state';
import { bookAction } from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        queueArray: state.mainReducer.queueArray,
        bookChangingId: state.mainReducer.bookChangingId,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        reviewBook: review => dispatch(bookAction.reviewBook(review)),
        deleteBook: bookId => dispatch(bookAction.deleteBook(bookId)),
        askBook: (bookId, ownerId, duration) => dispatch(bookAction.askBook(bookId, ownerId, duration)),
        returnBook: bookId => dispatch(bookAction.returnBook(bookId)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookStateComponent);
