import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import BookRemoverComponent from '../components/book_remover_component';

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: bookKey => dispatch(Actions.deleteBook(bookKey)),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(BookRemoverComponent);
