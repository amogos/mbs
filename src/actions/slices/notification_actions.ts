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

    public getReturnsForUser = (callback: (reviews: DataTypes.ReturnNotificationType[]) => void) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_GET_RETURNS,
        callback,
    });
}

export default NotificationAction;
