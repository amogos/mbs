import { connect } from 'react-redux';
import { notificationAction } from '../actions/';
import NotificationComponent from '../components/notifications_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        confirmRental: rental => dispatch(notificationAction.confirmRental(rental)),
        rejectRental: rental => dispatch(notificationAction.rejectRental(rental)),
        getReturns: callback => dispatch(notificationAction.getReturnsForUser(callback)),
        getQueue: callback => dispatch(notificationAction.getQueueForUser(callback)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationComponent);
