import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import NotificationComponent from '../components/notifications_component';

function mapStateToProps(state) {
    return {
        notification: state.treeReducer.notifications,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        confirmNotification: bookKey => dispatch(Actions.confirmNotification(bookKey)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationComponent);
