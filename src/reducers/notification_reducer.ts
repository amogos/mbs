import * as ActionConstants from '../constants/action_constant';
import * as Actions from '../actions/tree_actions';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import { GlobalVars, handleError } from './tree_reducer';

const { NotificationActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function notificationReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case NotificationActionConstant.ACTION_CONFIRM_RENTAL:
            databseInstance.confirmRental(action.bookKey, action.user, handleError).then(() => {
                databseInstance.getRentalNotifications(state.userdata, handleError).then(result => {
                    GlobalVars.rentalNotifications = result;
                    Store.dispatch(Actions.gotoNotifications());
                });
            });
            return Object.assign({}, state, {
                action: NotificationActionConstant.ACTION_CONFIRM_RENTAL,
                notifications: GlobalVars.rentalNotifications,
            });
        case NotificationActionConstant.ACTION_REJECT_RENTAL:
            databseInstance.rejectRental(action.bookKey, action.user, handleError).then(() => {
                databseInstance.getRentalNotifications(state.userdata, handleError).then(result => {
                    GlobalVars.rentalNotifications = result;
                    Store.dispatch(Actions.gotoNotifications());
                });
            });
            return Object.assign({}, state, {
                action: NotificationActionConstant.ACTION_REJECT_RENTAL,
                notifications: GlobalVars.rentalNotifications,
            });

        default:
            return state;
    }
}
