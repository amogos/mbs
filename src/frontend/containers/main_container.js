import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';
import { pageAction } from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
        booksArray: state.mainReducer.booksArray,
        spaces: state.mainReducer.spaces,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getBooks: (filters, callback) => dispatch(pageAction.getBooks(filters, callback)),
        getSpaces: filters => dispatch(pageAction.getSpaces(filters)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainComponent);
