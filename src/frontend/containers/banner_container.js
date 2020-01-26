import { connect } from 'react-redux';
import * as Action from '../actions/';
import BannerComponent from '../components/regions/banner_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        categories: state.mainReducer.categories,
        usercategories: state.mainReducer.usercategories,
        languages: state.mainReducer.languages,
        urlparams: state.mainReducer.urlparams,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getSpaces: (filters, callbacks) => dispatch(Action.getSpaces(filters, callbacks)),
        addBook: data => dispatch(Action.addBook(data)),
        loginUser: (user, onError) => dispatch(Action.loginUser(user, onError)),
        signUpUser: user => dispatch(Action.signUpUser(user)),
        logoutUser: () => dispatch(Action.logoutUser()),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerComponent);
