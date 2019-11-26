import { connect } from 'react-redux';
import BookDisplayComponent from '../components/books/book_display_component';

function mapStateToProps(state) {
    return {
        displayedBook: state.mainReducer.displayedBook,
        displayedBookReviews: state.mainReducer.displayedBookReviews,
    };
}

export default connect(mapStateToProps, null)(BookDisplayComponent);
