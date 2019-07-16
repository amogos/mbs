import { connect } from 'react-redux';
import { treeAction } from '../actions/';
import BannerComponent from '../components/banner_component';

const mapDispatchToProps = dispatch => {
    return {
        gotoListBooks: () => dispatch(treeAction.gotoListBooks()),
        gotoAddBook: () => dispatch(treeAction.gotoAddBook()),
        gotoNotifications: () => dispatch(treeAction.gotoNotifications()),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(BannerComponent);
