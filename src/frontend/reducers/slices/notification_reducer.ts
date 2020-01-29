import * as ActionConstants from '../../../shared/constants/action_constant';
import databseInstance from './../../../backend/database_instance';
import { handleError } from './../main_reducer';
import * as Action from '../../actions';
const { NotificationActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function notificationReducer(state: any, payload: Action.NotificationAction): any {
    switch (payload.type) {
        case NotificationActionConstant.ACTION_RATE_RETURN: {
            const action: Action.RateReturnAction = payload as Action.RateReturnAction;
            databseInstance.reviewUser(
                action.returnId,
                action.bookId,
                action.user.id,
                action.comment,
                action.rating,
                action.callback,
                handleError,
            );
            return state;
        }

        case NotificationActionConstant.ACTION_CONFIRM_RENTAL: {
            const action: Action.ConfirmRentalAction = payload as Action.ConfirmRentalAction;
            databseInstance.confirmRental(action.rental, action.callback, handleError);
            return state;
        }

        case NotificationActionConstant.ACTION_REJECT_RENTAL: {
            const action: Action.RejectRentalAction = payload as Action.RejectRentalAction;
            databseInstance.rejectRental(action.rental, action.callback, handleError);
            return state;
        }

        case NotificationActionConstant.ACTION_CONFIRM_SUBSCRIPTION: {
            const action: Action.ConfirmSubscriptionAction = payload as Action.ConfirmSubscriptionAction;
            databseInstance
                .confirmSubscription(action.subscription, action.callback, handleError)
                .then(() => action.callback());
            return state;
        }
        case NotificationActionConstant.ACTION_REJECT_SUBSCRIPTION: {
            const action: Action.RejectSubscriptionAction = payload as Action.RejectSubscriptionAction;
            databseInstance
                .rejectSubscription(action.subscription, action.callback, handleError)
                .then(() => action.callback());
            return state;
        }
        default:
            return null;
    }
}
