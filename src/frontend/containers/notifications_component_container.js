import { connect } from 'react-redux';
import * as Action from '../actions/';
import NotificationComponent from '../components/notifications/notifications_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        rateReturn: (returnId, bookId, user, state, comment, callback) =>
            dispatch(Action.rateReturn(returnId, bookId, user, state, comment, callback)),
        confirmRental: (rental, callback) => dispatch(Action.confirmRental(rental, callback)),
        rejectRental: (rental, callback) => dispatch(Action.rejectRental(rental, callback)),
        getReturns: callback => dispatch(Action.getReturnsForUser(callback)),
        getQueue: callback => dispatch(Action.getQueueForUser(callback)),
        getPendingSubscribersForUser: (userId, callback) =>
            dispatch(Action.getPendingSubscribersForUser(userId, callback)),
        confirmSubscription: (subscription, callback) => dispatch(Action.confirmSubscription(subscription, callback)),
        rejectSubscription: (subscription, callback) => dispatch(Action.rejectSubscription(subscription, callback)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);
