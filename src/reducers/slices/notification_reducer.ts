import * as ActionConstants from '../../constants/action_constant';
import databseInstance from '../../connectors/database_instance';
import { handleError } from './page_reducer';

const { NotificationActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function notificationReducer(state: any, action: any): any {
    switch (action.type) {
        case NotificationActionConstant.ACTION_GET_RETURNS:
            databseInstance.getReturnNotifications(state.userdata, handleError).then(result => action.callback(result));
            return state;
        case NotificationActionConstant.ACTION_GET_QUEUE:
            databseInstance.getQueueNotifications(state.userdata, handleError).then(result => action.callback(result));
            return state;
        case NotificationActionConstant.ACTION_CONFIRM_RENTAL:
            databseInstance.confirmRental(action.rental, handleError);

            return Object.assign({}, state, {
                action: NotificationActionConstant.ACTION_CONFIRM_RENTAL,
            });
        case NotificationActionConstant.ACTION_REJECT_RENTAL:
            databseInstance.rejectRental(action.rental, handleError);

            return Object.assign({}, state, {
                action: NotificationActionConstant.ACTION_REJECT_RENTAL,
            });
        default:
            return null;
    }
}
