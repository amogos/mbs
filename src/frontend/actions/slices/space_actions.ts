import * as ActionTypes from '../../../shared/constants/action_constant';
import { Action } from 'redux';

/**EnterSubscribeSpaceAction*/
export interface EnterSubscribeSpaceAction extends Action<string> {
    spaceId: number;
}
export const enterSubscribeSpace = (spaceId: number): EnterSubscribeSpaceAction => ({
    type: ActionTypes.default.SpaceActionConstant.ENTER_SUBSCRIBE,
    spaceId,
});

/**SubscribeSpaceAction*/
export interface SubscribeSpaceAction extends Action<string> {
    spaceId: number;
    onSuccess?: () => void;
    onFail?: () => void;
}
export const subscribeSpace = (spaceId: number, onSuccess?: () => void, onFail?: () => void): SubscribeSpaceAction => ({
    type: ActionTypes.default.SpaceActionConstant.SUBSCRIBE_SPACE,
    spaceId,
    onSuccess,
    onFail,
});
/**UnSubscribeSpaceAction*/
export interface UnSubscribeSpaceAction extends Action<string> {
    onSuccess?: () => void;
    onFail?: () => void;
}
export const unsubscribeSpace = (onSuccess?: () => void, onFail?: () => void): UnSubscribeSpaceAction => ({
    type: ActionTypes.default.SpaceActionConstant.UNSUBSCRIBE_SPACE,
    onSuccess,
    onFail,
});
/**ExitSubscribeSpaceAction*/
export interface ExitSubscribeSpaceAction extends Action<string> {
    spaceId: number;
}
export const exitSubscribeSpace = (spaceId: number): ExitSubscribeSpaceAction => ({
    type: ActionTypes.default.SpaceActionConstant.EXIT_SUBSCRIBE,
    spaceId,
});

export type SpaceActionType =
    | EnterSubscribeSpaceAction
    | SubscribeSpaceAction
    | UnSubscribeSpaceAction
    | ExitSubscribeSpaceAction;
