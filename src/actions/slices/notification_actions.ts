import * as ActionTypes from '../../constants/action_constant';
import * as DataTypes from '../../types';

class NotificationAction {
    public confirmRental = (bookId: number, user: DataTypes.UserRecordType) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_RENTAL,
        bookId,
        user,
    });

    public rejectRental = (bookId: number, user: DataTypes.UserRecordType) => ({
        type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_RENTAL,
        bookId,
        user,
    });
}

export default NotificationAction;
