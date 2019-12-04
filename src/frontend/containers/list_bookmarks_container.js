import { connect } from 'react-redux';
import ListBookmarksComponent from '../components/books/bookmarks/list_bookmarks_component';
import { bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        userBookmarks: state.mainReducer.userBookmarks,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        bookmarkBook: (bookId, onSuccess) => dispatch(bookAction.bookmarkBook(bookId, onSuccess)),
        unbookmarkBook: (bookId, onSuccess) => dispatch(bookAction.unbookmarkBook(bookId, onSuccess)),
        displayBook: bookId => dispatch(bookAction.displayBook(bookId)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBookmarksComponent);
