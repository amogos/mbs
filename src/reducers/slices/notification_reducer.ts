import * as ActionConstants from '../../constants/action_constant';
import { pageAction } from '../../actions';
import databseInstance from '../../connectors/database_instance';
import Store from '../../store';
import { GlobalVars, handleError } from './page_reducer';

const { NotificationActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function notificationReducer(state: any, action: any): any {
    switch (action.type) {
        case NotificationActionConstant.ACTION_CONFIRM_RENTAL:
            databseInstance.confirmRental(action.bookId, action.user, handleError).then(() => {
                databseInstance.getRentalNotifications(state.userdata, handleError).then(result => {
                    GlobalVars.rentalNotificationsArray = result;
                    Store.dispatch(pageAction.gotoNotifications());
                });
            });
            return Object.assign({}, state, {
                action: NotificationActionConstant.ACTION_CONFIRM_RENTAL,
                notifications: GlobalVars.rentalNotificationsArray,
            });
        case NotificationActionConstant.ACTION_REJECT_RENTAL:
            databseInstance.rejectRental(action.bookId, action.user, handleError).then(() => {
                databseInstance.getRentalNotifications(state.userdata, handleError).then(result => {
                    GlobalVars.rentalNotificationsArray = result;
                    Store.dispatch(pageAction.gotoNotifications());
                });
            });
            return Object.assign({}, state, {
                action: NotificationActionConstant.ACTION_REJECT_RENTAL,
                notifications: GlobalVars.rentalNotificationsArray,
            });

        default:
            return null;
    }
}
