import { connect } from 'react-redux';
import ListBooksComponent from '../components/list_books_component';
import * as Actions from '../actions/book_actions';

function mapStateToProps(state) {
    return {
        userdata: state.socialReducer.userdata,
        changingkey: state.treeReducer.changingkey,
        action: state.treeReducer.action,
        booksArray: state.treeReducer.booksArray,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: bookId => dispatch(Actions.deleteBook(bookId)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListBooksComponent);
