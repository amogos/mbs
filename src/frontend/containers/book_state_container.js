import { connect } from 'react-redux';
import BookStateComponent from '../components/book_actions/book_state';
import * as Action from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        queueArray: state.mainReducer.queueArray,
        bookChangingId: state.mainReducer.bookChangingId,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        reviewBook: review => dispatch(Action.reviewBook(review)),
        deleteBook: bookId => dispatch(Action.deleteBook(bookId)),
        askBook: (bookId, ownerId, duration) => dispatch(Action.askBook(bookId, ownerId, duration)),
        returnBook: bookId => dispatch(Action.returnBook(bookId)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookStateComponent);
