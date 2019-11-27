import { connect } from 'react-redux';
import BookDisplayComponent from '../components/books/book_display_component';
import { bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        displayedBook: state.mainReducer.displayedBook,
        displayedBookReviews: state.mainReducer.displayedBookReviews,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        likeReview: review => dispatch(bookAction.likeReview(review)),
        dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookDisplayComponent);
