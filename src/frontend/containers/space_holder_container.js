import { connect } from 'react-redux';
import SpaceHolderComponent from '../components/spaces/space_holder';
import * as Action from '../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        categories: state.mainReducer.categories,
        languages: state.mainReducer.languages,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getBookDescription: (isbn10, isbn13, callback) => dispatch(Action.getBookDescription(isbn10, isbn13, callback)),
        addBook: (data, onSuccess) => dispatch(Action.addBook(data, onSuccess)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaceHolderComponent);
