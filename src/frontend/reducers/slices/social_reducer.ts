import * as ActionConstants from '../../../shared/constants/action_constant';
import * as DataTypes from '../../../shared/types';
import { socialAction, pageAction } from './../../actions';
import databseInstance from './../../../backend/database_instance';
import Store from '../store';
import { handleError } from './../main_reducer';

const { SocialActionConstant } = ActionConstants.default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function socialReducer(state: any, action: any): any {
    switch (action.type) {
        case SocialActionConstant.ACTION_UPDATE_USER_DATA: {
            databseInstance.updateUser(action.user, handleError).then(() => {
                databseInstance
                    .getArrayCategories(action.user.categories, handleError)
                    .then((result: DataTypes.CategoryRecordType[]) => {
                        Store.dispatch(pageAction.refreshState({ usercategories: result }));
                    });
            });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_UPDATE_USER_DATA,
            });
        }

        case SocialActionConstant.ACTION_SIGN_UP_USER: {
            databseInstance.signUpUser(action.user, handleError).then((result: DataTypes.UserRecordType) => {
                if (result.id > 0) Store.dispatch(socialAction.addUserData(result));
            });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_SIGN_UP_USER,
            });
        }
        case SocialActionConstant.ACTION_LOGIN_USER: {
            databseInstance
                .loginUser(action.user, action.onError, handleError)
                .then((result: DataTypes.UserRecordType) => {
                    if (result.id > 0) Store.dispatch(socialAction.addUserData(result));
                });
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_LOGIN_USER,
            });
        }
        case SocialActionConstant.ACTION_LOGOUT_USER: {
            return Object.assign({}, state, {
                action: SocialActionConstant.ACTION_LOGOUT_USER,
                userdata: DataTypes.NullUserRecordType,
            });
        }
        case SocialActionConstant.ACTION_USER_DATA:
            databseInstance.getLanguages(handleError).then((result: DataTypes.LanguageRecordType[]) => {
                Store.dispatch(pageAction.refreshState({ languages: result }));
            });
            databseInstance.getCategories(handleError).then((result: DataTypes.CategoryRecordType[]) => {
                Store.dispatch(pageAction.refreshState({ categories: result }));
            });
            databseInstance.getFeeds(action.userdata.id, handleError).then((result: DataTypes.UserFeedRecordType[]) => {
                Store.dispatch(pageAction.refreshState({ userfeed: result }));
            });
            databseInstance
                .getQueue(action.userdata.id, handleError)
                .then((result: DataTypes.QueueNotificationRecordType[]) => {
                    Store.dispatch(pageAction.refreshState({ queueArray: result, append: false }));
                });
            databseInstance
                .getArrayCategories(action.userdata.categories, handleError)
                .then((result: DataTypes.CategoryRecordType[]) => {
                    Store.dispatch(pageAction.refreshState({ usercategories: result }));
                });

            const stateAppend: {
                userdata: DataTypes.UserValueType;
                userSpaces: DataTypes.SpaceType[];
                otherSpaces: DataTypes.SpaceType[];
            } = { userdata: action.userdata, userSpaces: [], otherSpaces: [] };

            return Object.assign({}, state, stateAppend);

        default:
            return null;
    }
}
