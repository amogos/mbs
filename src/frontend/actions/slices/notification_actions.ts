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
    rental: DataTypes.QueueNotificationType;
    callback: () => void;
}
export const confirmRental = (rental: DataTypes.QueueNotificationType, callback: () => void): ConfirmRentalAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_RENTAL,
    rental,
    callback,
});

/**RejectRentalAction*/
export interface RejectRentalAction extends Action<string> {
    rental: DataTypes.QueueNotificationType;
    callback: () => void;
}
export const rejectRental = (rental: DataTypes.QueueNotificationType, callback: () => void): RejectRentalAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_RENTAL,
    rental,
    callback,
});

/**GetReturnsForUserAction*/
export interface GetReturnsForUserAction extends Action<string> {
    callback: (reviews: DataTypes.ReturnNotificationType[]) => void;
}
export const getReturnsForUser = (
    callback: (reviews: DataTypes.ReturnNotificationType[]) => void,
): GetReturnsForUserAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_GET_RETURNS,
    callback,
});

/**GetQueueForUserAction*/
export interface GetQueueForUserAction extends Action<string> {
    callback: (reviews: DataTypes.QueueNotificationType[]) => void;
}
export const getQueueForUser = (
    callback: (reviews: DataTypes.QueueNotificationType[]) => void,
): GetQueueForUserAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_GET_QUEUE,
    callback,
});

/**GetPendingSubscribersForUserAction*/
export interface GetPendingSubscribersForUserAction extends Action<string> {
    callback: (subscribers: SubscribeNotificationType[]) => void;
}
export const getPendingSubscribersForUser = (
    userId: number,
    callback: (subscribers: SubscribeNotificationType[]) => void,
): GetPendingSubscribersForUserAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_GET_SUBSCRIBERS,
    callback,
});

/**ConfirmSubscriptionAction*/
export interface ConfirmSubscriptionAction extends Action<string> {
    subscription: DataTypes.SubscribeNotificationType;
    callback: () => void;
}
export const confirmSubscription = (
    subscription: DataTypes.SubscribeNotificationType,
    callback: () => void,
): ConfirmSubscriptionAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_CONFIRM_SUBSCRIPTION,
    subscription,
    callback,
});

/**RejectSubscriptionAction*/
export interface RejectSubscriptionAction extends Action<string> {
    subscription: DataTypes.SubscribeNotificationType;
    callback: () => void;
}
export const rejectSubscription = (
    subscription: DataTypes.SubscribeNotificationType,
    callback: () => void,
): RejectSubscriptionAction => ({
    type: ActionTypes.default.NotificationActionConstant.ACTION_REJECT_SUBSCRIPTION,
    subscription,
    callback,
});

export type NotificationActionType =
    | RateReturnAction
    | ConfirmRentalAction
    | RejectRentalAction
    | GetReturnsForUserAction
    | GetQueueForUserAction
    | GetPendingSubscribersForUserAction
    | ConfirmSubscriptionAction
    | RejectSubscriptionAction;
