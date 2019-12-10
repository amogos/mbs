import { connect } from 'react-redux';
import BookActionsComponent from '../components/books/book/book_actions/book_actions';
import { bookAction } from './../actions';

const mapDispatchToProps = dispatch => {
    return {
        bookmarkBook: (bookId, onSuccess) => dispatch(bookAction.bookmarkBook(bookId, onSuccess)),
        dispatch,
    };
};

export default connect(null, mapDispatchToProps)(BookActionsComponent);
