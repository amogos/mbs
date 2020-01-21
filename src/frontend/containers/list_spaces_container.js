import { connect } from 'react-redux';
import SpacesComponent from '../components/spaces/list_spaces_component';
import { pageAction, bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        userSpaces: state.mainReducer.userSpaces,
        otherSpaces: state.mainReducer.otherSpaces,
        userdata: state.mainReducer.userdata,
        categories: state.mainReducer.categories,
        languages: state.mainReducer.languages,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getBooks: (filters, callbacks) => dispatch(pageAction.getBooks(filters, callbacks)),
        getBookDescription: (isbn10, isbn13, callback) =>
            dispatch(bookAction.getBookDescription(isbn10, isbn13, callback)),
        addBook: (data, onSuccess) => dispatch(bookAction.addBook(data, onSuccess)),
        likeBook: book => dispatch(bookAction.likeBook(book)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpacesComponent);
