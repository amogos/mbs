import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import BannerComponent from '../components/banner_component';

const mapDispatchToProps = dispatch => {
    return {
        gotoListBooks: () => dispatch(Actions.gotoListBooks()),
        gotoAddBook: () => dispatch(Actions.gotoAddBook()),
        gotoNotifications: () => dispatch(Actions.gotoNotifications()),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(BannerComponent);
