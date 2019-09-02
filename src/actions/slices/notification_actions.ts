import * as ActionTypes from '../../constants/action_constant';
import * as DataTypes from '../../types';

class NotificationAction {
    public confirmRental = (rental: DataTypes.QueueNotificationType) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_RENTAL,
        rental,
    });

    public rejectRental = (rental: DataTypes.QueueNotificationType) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_RENTAL,
        rental,
    });

    public getReturnsForUser = (callback: (reviews: DataTypes.ReturnNotificationType[]) => void) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_GET_RETURNS,
        callback,
    });

    public getQueueForUser = (callback: (reviews: DataTypes.QueueNotificationRecordType[]) => void) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_GET_QUEUE,
        callback,
    });
}

export default NotificationAction;
