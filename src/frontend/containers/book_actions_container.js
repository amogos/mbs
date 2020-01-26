import { connect } from 'react-redux';
import BookActionsComponent from '../components/book_actions/book_actions';
import * as Action from './../actions';

const mapDispatchToProps = dispatch => {
    return {
        bookmarkBook: (bookId, onSuccess) => dispatch(Action.bookmarkBook(bookId, onSuccess)),
        dispatch,
    };
};

export default connect(null, mapDispatchToProps)(BookActionsComponent);
