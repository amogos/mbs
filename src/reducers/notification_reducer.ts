import * as ActionConstants from '../constants/notification_actions_constants';
import * as Actions from '../actions/index';
import databseInstance from '../connectors/database_instance';
import Store from './../store';
import { GlobalVars, handleResultCode } from './tree_reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function notificationReducer(state = {} as any, action: any): any {
    switch (action.type) {
        case ActionConstants.ACTION_CONFIRM_RENTAL:
            databseInstance.confirmRental(action.bookKey, action.user, handleResultCode).then(() => {
                databseInstance.getRentalNotifications(state.userdata, handleResultCode).then(result => {
                    GlobalVars.rentalNotifications = result;
                    Store.dispatch(Actions.gotoNotifications());
                });
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_CONFIRM_RENTAL,
                notifications: GlobalVars.rentalNotifications,
            });
        case ActionConstants.ACTION_REJECT_RENTAL:
            databseInstance.rejectRental(action.bookKey, action.user, handleResultCode).then(() => {
                databseInstance.getRentalNotifications(state.userdata, handleResultCode).then(result => {
                    GlobalVars.rentalNotifications = result;
                    Store.dispatch(Actions.gotoNotifications());
                });
            });
            return Object.assign({}, state, {
                action: ActionConstants.ACTION_REJECT_RENTAL,
                notifications: GlobalVars.rentalNotifications,
            });

        default:
            return state;
    }
}
