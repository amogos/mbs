import { connect } from 'react-redux';
import ListBooksComponent from '../components/list_books_component';
import * as Actions from '../actions/book_actions';

function mapStateToProps(state) {
    return {
        userdata: state.socialReducer.userdata,
        bookChangingId: state.treeReducer.bookChangingId,
        action: state.treeReducer.action,
        booksArray: state.treeReducer.booksArray,
        queueArray: state.treeReducer.queueArray,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: bookId => dispatch(Actions.deleteBook(bookId)),
        askBook: bookId => dispatch(Actions.askBook(bookId)),
        returnBook: bookId => dispatch(Actions.returnBook(bookId)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListBooksComponent);
