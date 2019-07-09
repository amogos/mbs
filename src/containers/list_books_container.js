import { connect } from 'react-redux';
import ListBooksComponent from '../components/list_books_component';

function mapStateToProps(state) {
    return {
        userdata: state.socialReducer.userdata,
        changingkey: state.treeReducer.changingkey,
        action: state.treeReducer.action,
        booksArray: state.treeReducer.booksArray,
    };
}

export default connect(
    mapStateToProps,
    null,
)(ListBooksComponent);
