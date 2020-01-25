import { connect } from 'react-redux';
import LeftComponent from '../components/regions/left_component';
import { bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
        userSpaces: state.mainReducer.userSpaces,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        bookmarkBook: (bookId, onSuccess) => dispatch(bookAction.bookmarkBook(bookId, onSuccess)),
        unbookmarkBook: (bookId, onSuccess) => dispatch(bookAction.unbookmarkBook(bookId, onSuccess)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftComponent);
