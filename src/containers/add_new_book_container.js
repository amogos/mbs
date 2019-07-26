import { connect } from 'react-redux';
import { pageAction } from '../actions/';
import AddNewBookComponent from '../components/add_new_book_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        action: state.mainReducer.action,
        languages: state.mainReducer.languages,
        categories: state.mainReducer.categories,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addBook: data => dispatch(pageAction.addBook(data)),
        dispatch,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewBookComponent);
