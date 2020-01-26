import { connect } from 'react-redux';
import SpacesComponent from '../components/spaces/list_spaces_component';
import * as Action from '../actions';

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
        getBooks: (filters, callbacks) => dispatch(Action.getBooks(filters, callbacks)),
        getBookDescription: (isbn10, isbn13, callback) => dispatch(Action.getBookDescription(isbn10, isbn13, callback)),
        addBook: (data, onSuccess) => dispatch(Action.addBook(data, onSuccess)),
        likeBook: book => dispatch(Action.likeBook(book)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpacesComponent);
