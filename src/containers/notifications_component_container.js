import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import NotificationComponent from '../components/notifications_component';

function mapStateToProps(state) {
    return {
        notifications: state.notificationReducer.notifications,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        confirmRental: (bookKey, user) => dispatch(Actions.confirmRental(bookKey, user)),
        rejectRental: (bookKey, user) => dispatch(Actions.rejectRental(bookKey, user)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationComponent);
