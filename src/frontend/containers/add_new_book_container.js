import { connect } from 'react-redux';
import { bookAction } from '../actions/';
import AddNewBookComponent from '../components/books/add_new_book_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        categories: state.mainReducer.categories,
        languages: state.mainReducer.languages,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addBook: data => dispatch(bookAction.addBook(data)),
        dispatch,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewBookComponent);
