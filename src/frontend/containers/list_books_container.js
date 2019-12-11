import { connect } from 'react-redux';
import ListBooksComponent from '../components/books/books_listing/list_books_component';

function mapStateToProps(state) {
    return {
        booksArray: state.mainReducer.booksArray,
    };
}

export default connect(mapStateToProps, null)(ListBooksComponent);
