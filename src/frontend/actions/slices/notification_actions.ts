import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';

class NotificationAction {
    public rateReturn = (
        returnId: number,
        bookId: number,
        user: DataTypes.UserRecordType,
        rating: number,
        comment: string,
        callback: () => void,
    ) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_RATE_RETURN,
        returnId,
        bookId,
        user,
        rating,
        comment,
        callback,
    });
    public confirmRental = (rental: DataTypes.QueueNotificationType, callback: () => void) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_RENTAL,
        rental,
        callback,
    });

    public rejectRental = (rental: DataTypes.QueueNotificationType, callback: () => void) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_RENTAL,
        rental,
        callback,
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
