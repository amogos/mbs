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
        gotoSpaces: () => dispatch(pageAction.gotoSpaces()),
        refreshState: params => dispatch(pageAction.refreshState(params)),
        gotoNotifications: () => dispatch(pageAction.gotoNotifications()),
        addBook: data => dispatch(pageAction.addBook(data)),
        loginUser: user => dispatch(socialAction.loginUser(user)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BannerComponent);
