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
        confirmRental: (bookKey, user) => dispatch(notificationAction.confirmRental(bookKey, user)),
        rejectRental: (bookKey, user) => dispatch(notificationAction.rejectRental(bookKey, user)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationComponent);
