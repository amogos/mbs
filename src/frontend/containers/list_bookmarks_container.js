import { connect } from 'react-redux';
import ListBookmarksComponent from '../components/bookmarks/list_bookmarks_component';
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
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBookmarksComponent);
