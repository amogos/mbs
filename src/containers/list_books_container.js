import { connect } from 'react-redux';
import ListBooksComponent from '../components/list_books_component';

function mapStateToProps(state) {
    return {
        action: state.mainReducer.action,
        booksArray: state.mainReducer.booksArray,
    };
}

export default connect(
    mapStateToProps,
    null,
)(ListBooksComponent);
