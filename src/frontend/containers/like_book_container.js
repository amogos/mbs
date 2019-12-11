import { connect } from 'react-redux';
import LikeBookComponent from '../components/books/book/book_actions/like_book';
import { bookAction } from './../actions';

const mapDispatchToProps = dispatch => {
    return {
        likeBook: book => dispatch(bookAction.likeBook(book)),
        dispatch,
    };
};

export default connect(null, mapDispatchToProps)(LikeBookComponent);
