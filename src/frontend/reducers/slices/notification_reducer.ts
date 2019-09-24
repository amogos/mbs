import * as ActionConstants from '../../../shared/constants/action_constant';
import databseInstance from './../../../backend/database_instance';
import { GlobalVars, handleError } from './../main_reducer';

const { NotificationActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function notificationReducer(state: any, action: any): any {
    switch (action.type) {
        case NotificationActionConstant.ACTION_RATE_RETURN:
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
        case NotificationActionConstant.ACTION_GET_RETURNS:
            databseInstance.getReturnNotifications(state.userdata, handleError).then(result => action.callback(result));
            return state;
        case NotificationActionConstant.ACTION_GET_QUEUE:
            databseInstance.getQueueNotifications(state.userdata, handleError).then(result => action.callback(result));
            return state;
        case NotificationActionConstant.ACTION_CONFIRM_RENTAL:
            databseInstance.confirmRental(action.rental, action.callback, handleError);
            return state;
        case NotificationActionConstant.ACTION_REJECT_RENTAL:
            databseInstance.rejectRental(action.rental, action.callback, handleError);
            return state;
        default:
            return null;
    }
}
