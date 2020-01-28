import Strings from '../../shared/constants/string_constant';
import { message } from 'antd';
import bookReducer from './slices/book_reducer';
import notificationReducer from './slices/notification_reducer';
import pageReducer from './slices/page_reducer';
import socialReducer from './slices/social_reducer';
import spaceReducer from './slices/space_reducer';
import feedReducer from './slices/feed_reducer';
import { AppActions, BookAction, PageAction, SocialAction, SpaceAction, NotificationAction } from './../actions';

export function handleError(resultCode: number): void {
    message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED + ' (' + resultCode + ')');
}

export function handleSuccess(): void {
    message.success(Strings.MYBOOKSHELVE_OPERATION_SUCCESS);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function mainReducer(state = {}, action: AppActions): any {
    let newState = bookReducer(state, action as BookAction);
    if (newState !== null) return newState;

    newState = feedReducer(state, action as BookAction);
    if (newState !== null) return newState;

    newState = notificationReducer(state, action as NotificationAction);
    if (newState !== null) return newState;

    newState = pageReducer(state, action as PageAction);
    if (newState !== null) return newState;

    newState = socialReducer(state, action as SocialAction);
    if (newState !== null) return newState;

    newState = spaceReducer(state, action as SpaceAction);
    if (newState !== null) return newState;

    return state;
}
