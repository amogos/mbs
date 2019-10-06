import { connect } from 'react-redux';
import { pageAction, socialAction } from '../actions/';
import BannerComponent from '../components/regions/banner_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        categories: state.mainReducer.categories,
        languages: state.mainReducer.languages,
        page: state.mainReducer.page,
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
