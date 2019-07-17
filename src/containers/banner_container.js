import { connect } from 'react-redux';
import { pageAction } from '../actions/';
import BannerComponent from '../components/banner_component';

const mapDispatchToProps = dispatch => {
    return {
        gotoListBooks: () => dispatch(pageAction.gotoListBooks()),
        gotoAddBook: () => dispatch(pageAction.gotoAddBook()),
        gotoNotifications: () => dispatch(pageAction.gotoNotifications()),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(BannerComponent);
