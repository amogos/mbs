import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';
import * as Action from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
        booksArray: state.mainReducer.booksArray,
        userSpaces: state.mainReducer.userSpaces,
        otherSpaces: state.mainReducer.otherSpaces,
        userFeed: state.mainReducer.userFeed,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        signUpUser: user => dispatch(Action.signUpUser(user)),
        loginUser: (user, onError) => dispatch(Action.loginUser(user, onError)),
        getBooks: (filters, callbacks) => dispatch(Action.getBooks(filters, callbacks)),
        getSpaces: (filters, callbacks) => dispatch(Action.getSpaces(filters, callbacks)),
        getFeeds: (filters, callbacks) => dispatch(Action.getFeeds(filters, callbacks)),
        enterSubscribeSpace: spaceId => dispatch(Action.enterSubscribeSpace(spaceId)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
