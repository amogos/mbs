import { connect } from 'react-redux';
import DisplayBookComponent from '../components/books/display_book_component';
import { bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        book: state.mainReducer.displayedBook,
        bookReviews: state.mainReducer.displayedBookReviews,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        likeReview: review => dispatch(bookAction.likeReview(review)),
        likeBook: book => dispatch(bookAction.likeBook(book)),
        dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayBookComponent);
