import { connect } from 'react-redux';
import { pageAction, socialAction } from '../actions/';
import BannerComponent from '../components/regions/banner_component';
import { sessionState } from './../reducers/middleware/session_cacher';

function mapStateToProps(state, ownProps) {
    const cachedState = sessionState();
    return {
        userdata: cachedState.mainReducer.userdata,
        categories: cachedState.mainReducer.categories,
        languages: cachedState.mainReducer.languages,
        urlparams: ownProps.match.params,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        gotoListBooks: filters => dispatch(pageAction.gotoListBooks(filters)),
        gotoSpaces: () => dispatch(pageAction.gotoSpaces()),
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
