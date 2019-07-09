import { connect } from 'react-redux';
import * as Actions from '../actions/book_actions';
import BookPlacementComponent from '../components/book_placement_component';

const mapDispatchToProps = dispatch => {
    return {
        askBook: (bookKey, ownerId) => dispatch(Actions.askBook(bookKey, ownerId)),
        returnBook: bookKey => dispatch(Actions.returnBook(bookKey)),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(BookPlacementComponent);
