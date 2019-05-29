import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import BookPlacementComponent from '../components/book_placement_component';

const mapDispatchToProps = dispatch => {
    return {
        assignBook: bookKey => dispatch(Actions.assignBook(bookKey)),
        returnBook: bookKey => dispatch(Actions.returnBook(bookKey)),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(BookPlacementComponent);
