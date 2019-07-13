import * as ActionTypes from '../constants/action_constant';
import * as DataTypes from '../types';

export const confirmRental = (bookId: number, user: DataTypes.UserRecordType) => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_RENTAL,
    bookId,
    user,
});

export const rejectRental = (bookId: number, user: DataTypes.UserRecordType) => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_RENTAL,
    bookId,
    user,
});
