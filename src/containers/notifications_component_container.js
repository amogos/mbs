import { connect } from 'react-redux';
import { notificationAction } from '../actions/';
import NotificationComponent from '../components/notifications_component';

function mapStateToProps(state) {
    return {
        notifications: state.mainReducer.notifications,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        confirmRental: rental => dispatch(notificationAction.confirmRental(rental)),
        rejectRental: rental => dispatch(notificationAction.rejectRental(rental)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationComponent);
