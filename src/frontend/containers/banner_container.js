import { connect } from 'react-redux';
import { pageAction, socialAction } from '../actions/';
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
        getSpaces: (filters, callbacks) => dispatch(pageAction.getSpaces(filters, callbacks)),
        gotoNotifications: () => dispatch(pageAction.gotoNotifications()),
        addBook: data => dispatch(pageAction.addBook(data)),
        loginUser: (user, onError) => dispatch(socialAction.loginUser(user, onError)),
        signUpUser: user => dispatch(socialAction.signUpUser(user)),
        logoutUser: () => dispatch(socialAction.logoutUser()),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerComponent);
