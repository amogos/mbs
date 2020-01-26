import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { socialAction, pageAction } from './../../actions';
import databseInstance from './../../../backend/database_instance';
import Store from '../store';
import { handleError } from './../main_reducer';
import * as SocialActionsTypes from './../../actions/slices/social_actions';
const { SocialActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function socialReducer(state: any, action: SocialActionsTypes.SocialActionType): any {
    switch (action.type) {
        case SocialActionConstant.ACTION_UPDATE_USER_DATA: {
            const actionData: SocialActionsTypes.UpdateUserActionType = action as SocialActionsTypes.UpdateUserActionType;
            databseInstance.updateUser(actionData.userdata, handleError).then(() => {
                databseInstance
                    .getArrayCategories(actionData.userdata.categories, handleError)
                    .then((result: DataTypes.CategoryRecordType[]) => {
                        Store.dispatch(pageAction.refreshState({ usercategories: result }));
                    });
            });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_UPDATE_USER_DATA,
            });
        }

        case SocialActionConstant.ACTION_SIGN_UP_USER: {
            const actionData: SocialActionsTypes.SignupUserActionType = action as SocialActionsTypes.SignupUserActionType;
            databseInstance.signUpUser(actionData.userdata, handleError).then((result: DataTypes.UserRecordType) => {
                if (result.id > 0) Store.dispatch(socialAction.addUserData(result));
            });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_SIGN_UP_USER,
            });
        }
        case SocialActionConstant.ACTION_LOGIN_USER: {
            const actionData: SocialActionsTypes.LoginUserActionType = action as SocialActionsTypes.LoginUserActionType;
            databseInstance
                .loginUser(actionData.userdata, handleError, actionData.onError)
                .then((result: DataTypes.UserRecordType) => {
                    if (result.id > 0) Store.dispatch(socialAction.addUserData(result));
                });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_LOGIN_USER,
            });
        }
        case SocialActionConstant.ACTION_LOGOUT_USER: {
            const actionData: SocialActionsTypes.LogoutUserActionType = action as SocialActionsTypes.LogoutUserActionType;
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_LOGOUT_USER,
                userdata: DataTypes.NullUserRecordType,
            });
        }
        case SocialActionConstant.ACTION_USER_DATA:
            const actionData: SocialActionsTypes.AddUserActionType = action as SocialActionsTypes.AddUserActionType;
            databseInstance.getLanguages(handleError).then((result: DataTypes.LanguageRecordType[]) => {
                Store.dispatch(pageAction.refreshState({ languages: result }));
            });
            databseInstance.getCategories(handleError).then((result: DataTypes.CategoryRecordType[]) => {
                Store.dispatch(pageAction.refreshState({ categories: result }));
            });
            databseInstance
                .getQueue(actionData.userdata.id, handleError)
                .then((result: DataTypes.QueueNotificationRecordType[]) => {
                    Store.dispatch(pageAction.refreshState({ queueArray: result, append: false }));
                });
            databseInstance
                .getArrayCategories(actionData.userdata.categories, handleError)
                .then((result: DataTypes.CategoryRecordType[]) => {
                    Store.dispatch(pageAction.refreshState({ usercategories: result }));
                });

            databseInstance.syncUserSubscrptions(actionData.userdata, handleError);

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
