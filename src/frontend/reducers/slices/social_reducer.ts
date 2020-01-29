import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import databseInstance from './../../../backend/database_instance';
import Store from '../store';
import { handleError } from './../main_reducer';
import * as Action from './../../actions';
const { SocialActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function socialReducer(state: any, action: Action.SocialAction): any {
    switch (action.type) {
        case SocialActionConstant.ACTION_UPDATE_USER_DATA: {
            const actionData: Action.UpdateUserActionType = action as Action.UpdateUserActionType;
            databseInstance.updateUser(actionData.userdata, handleError).then(() => {
                databseInstance
                    .getArrayCategories(actionData.userdata.categories, handleError)
                    .then((result: DataTypes.CategoryRecordType[]) => {
                        Store.dispatch(Action.refreshState({ usercategories: result }));
                    });
            });
            return Object.assign({}, state, {
                action: actionData.type,
            });
        }

        case SocialActionConstant.ACTION_SIGN_UP_USER: {
            const actionData: Action.SignupUserActionType = action as Action.SignupUserActionType;
            databseInstance.signUpUser(actionData.userdata, handleError).then((result: DataTypes.UserRecordType) => {
                if (result.id > 0) Store.dispatch(Action.addUserData(result));
            });
            return Object.assign({}, state, {
                action: actionData.type,
            });
        }
        case SocialActionConstant.ACTION_LOGIN_USER: {
            const actionData: Action.LoginUserActionType = action as Action.LoginUserActionType;
            databseInstance
                .loginUser(actionData.userdata, handleError, actionData.onError)
                .then((result: DataTypes.UserRecordType) => {
                    if (result.id > 0) Store.dispatch(Action.addUserData(result));
                });
            return Object.assign({}, state, {
                action: actionData.type,
            });
        }
        case SocialActionConstant.ACTION_LOGOUT_USER: {
            const actionData: Action.LogoutUserActionType = action as Action.LogoutUserActionType;
            return Object.assign({}, state, {
                action: actionData.type,
                userdata: DataTypes.NullUserRecordType,
            });
        }
        case SocialActionConstant.ACTION_USER_DATA:
            const actionData: Action.AddUserActionType = action as Action.AddUserActionType;
            databseInstance.getLanguages(handleError).then((result: DataTypes.LanguageRecordType[]) => {
                Store.dispatch(Action.refreshState({ languages: result }));
            });
            databseInstance.getCategories(handleError).then((result: DataTypes.CategoryRecordType[]) => {
                Store.dispatch(Action.refreshState({ categories: result }));
            });
            databseInstance
                .getArrayCategories(actionData.userdata.categories, handleError)
                .then((result: DataTypes.CategoryRecordType[]) => {
                    Store.dispatch(Action.refreshState({ usercategories: result }));
                });

            databseInstance.syncUserSubscrptions(actionData.userdata, handleError);

            databseInstance
                .getNotificationsFromUserIdOfType(
                    actionData.userdata.id,
                    DataTypes.NotificationType.REQUEST_BOOK,
                    handleError,
                )
                .then((result: DataTypes.AppNotification[]) => {
                    Store.dispatch(Action.refreshState({ queueArray: result, append: false }));
                });

            databseInstance
                .getNotificationsToUserId(actionData.userdata.id, handleError)
                .then((result: DataTypes.AppNotification[]) => {
                    Store.dispatch(Action.refreshState({ notifications: result, append: false }));
                });

            const stateAppend: {
                userdata: DataTypes.UserValueType;
                userSpaces: DataTypes.SpaceType[];
                otherSpaces: DataTypes.SpaceType[];
            } = { userdata: actionData.userdata, userSpaces: [], otherSpaces: [] };

            return Object.assign({}, state, stateAppend);

        default:
            return null;
    }
}
