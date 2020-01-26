import { connect } from 'react-redux';
import LikeBookComponent from '../components/book_actions/like_book';
import * as Action from './../actions';

const mapDispatchToProps = dispatch => {
    return {
        likeBook: book => dispatch(Action.likeBook(book)),
        dispatch,
    };
};

export default connect(null, mapDispatchToProps)(LikeBookComponent);
