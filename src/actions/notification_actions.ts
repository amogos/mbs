import * as ActionTypes from '../constants/notification_actions_constants';
import * as DataTypes from '../types';

export const confirmRental = (bookId: number, user: DataTypes.UserRecordType) => ({
    type: ActionTypes.ACTION_CONFIRM_RENTAL,
    bookId,
    user,
});

export const rejectRental = (bookId: number, user: DataTypes.UserRecordType) => ({
    type: ActionTypes.ACTION_REJECT_RENTAL,
    bookId,
    user,
});