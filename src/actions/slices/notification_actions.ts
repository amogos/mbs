import * as ActionTypes from '../../constants/action_constant';
import * as DataTypes from '../../types';

class NotificationAction {
    public confirmRental = (rental: DataTypes.RentalNotificationRecordType) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_RENTAL,
        rental,
    });

    public rejectRental = (rental: DataTypes.RentalNotificationRecordType) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_RENTAL,
        rental,
    });
}

export default NotificationAction;
