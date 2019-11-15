import { connect } from 'react-redux';
import { pageAction, socialAction } from '../actions/';
import BannerComponent from '../components/regions/banner_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        categories: state.mainReducer.categories,
        languages: state.mainReducer.languages,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getSpaces: filters => dispatch(pageAction.getSpaces(filters)),
        gotoNotifications: () => dispatch(pageAction.gotoNotifications()),
        addBook: data => dispatch(pageAction.addBook(data)),
        loginUser: (user, onError) => dispatch(socialAction.loginUser(user, onError)),
        logoutUser: () => dispatch(socialAction.logoutUser()),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerComponent);
