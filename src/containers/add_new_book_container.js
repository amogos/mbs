import { connect } from 'react-redux';
import { treeAction } from '../actions/';
import AddNewBookComponent from '../components/add_new_book_component';

function mapStateToProps(state) {
    return {
        userdata: state.socialReducer.userdata,
        action: state.treeReducer.action,
        languages: state.treeReducer.languages,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addBook: data => dispatch(treeAction.addBook(data)),
        dispatch,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewBookComponent);
