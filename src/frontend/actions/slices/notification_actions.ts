import * as ActionTypes from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { Action } from 'redux';
import { SubscribeNotificationType } from '../../../shared/types';

/**RateReturnAction*/
export interface RateReturnAction extends Action<string> {
    returnId: number;
    bookId: number;
    user: DataTypes.UserRecordType;
    rating: number;
    comment: string;
    callback: () => void;
}
export const rateReturn = (
    returnId: number,
    bookId: number,
    user: DataTypes.UserRecordType,
    rating: number,
    comment: string,
    callback: () => void,
): RateReturnAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_RATE_RETURN,
    returnId,
    bookId,
    user,
    rating,
    comment,
    callback,
});

/**ConfirmRentalAction*/
export interface ConfirmRentalAction extends Action<string> {
    rental: DataTypes.AppNotification;
    callback: () => void;
}
export const confirmRental = (rental: DataTypes.AppNotification, callback: () => void): ConfirmRentalAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_RENTAL,
    rental,
    callback,
});

/**RejectRentalAction*/
export interface RejectRentalAction extends Action<string> {
    rental: DataTypes.AppNotification;
    callback: () => void;
}
export const rejectRental = (rental: DataTypes.AppNotification, callback: () => void): RejectRentalAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_RENTAL,
    rental,
    callback,
});

/**ConfirmSubscriptionAction*/
export interface ConfirmSubscriptionAction extends Action<string> {
    subscription: DataTypes.AppNotification;
    callback: () => void;
}
export const confirmSubscription = (
    subscription: DataTypes.AppNotification,
    callback: () => void,
): ConfirmSubscriptionAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_SUBSCRIPTION,
    subscription,
    callback,
});

/**RejectSubscriptionAction*/
export interface RejectSubscriptionAction extends Action<string> {
    subscription: DataTypes.AppNotification;
    callback: () => void;
}
export const rejectSubscription = (
    subscription: DataTypes.AppNotification,
    callback: () => void,
): RejectSubscriptionAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_SUBSCRIPTION,
    subscription,
    callback,
});

export type NotificationAction =
    | RateReturnAction
    | ConfirmRentalAction
    | RejectRentalAction
    | ConfirmSubscriptionAction
    | RejectSubscriptionAction;
