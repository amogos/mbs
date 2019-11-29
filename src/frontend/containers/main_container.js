import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';
import { pageAction, socialAction } from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
        booksArray: state.mainReducer.booksArray,
        userSpaces: state.mainReducer.userSpaces,
        otherSpaces: state.mainReducer.otherSpaces,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (user, onError) => dispatch(socialAction.loginUser(user, onError)),
        getBooks: (filters, callback) => dispatch(pageAction.getBooks(filters, callback)),
        getSpaces: filters => dispatch(pageAction.getSpaces(filters)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
