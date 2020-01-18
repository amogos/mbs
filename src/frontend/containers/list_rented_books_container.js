import { connect } from 'react-redux';
import ListRentedBooksComponent from '../components/rented_books/list_rented_books_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        userRentedBooks: state.mainReducer.userRentedBooks,
    };
}

export default connect(mapStateToProps, null)(ListRentedBooksComponent);
