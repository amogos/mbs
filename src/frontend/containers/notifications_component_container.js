import { connect } from 'react-redux';
import { notificationAction } from '../actions/';
import NotificationComponent from '../components/notifications/notifications_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        rateReturn: (returnId, bookId, user, state, comment, callback) =>
            dispatch(notificationAction.rateReturn(returnId, bookId, user, state, comment, callback)),
        confirmRental: (rental, callback) => dispatch(notificationAction.confirmRental(rental, callback)),
        rejectRental: (rental, callback) => dispatch(notificationAction.rejectRental(rental, callback)),
        getReturns: callback => dispatch(notificationAction.getReturnsForUser(callback)),
        getQueue: callback => dispatch(notificationAction.getQueueForUser(callback)),
        getPendingSubscribersForUser: (userId, callback) =>
            dispatch(notificationAction.getPendingSubscribersForUser(userId, callback)),
        confirmSubscription: (subscription, callback) =>
            dispatch(notificationAction.confirmSubscription(subscription, callback)),
        rejectSubscription: (subscription, callback) =>
            dispatch(notificationAction.rejectSubscription(subscription, callback)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);
