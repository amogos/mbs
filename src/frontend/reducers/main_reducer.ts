import Strings from '../../shared/constants/string_constant';
import { message } from 'antd';
import bookReducer from './slices/book_reducer';
import notificationReducer from './slices/notification_reducer';
import pageReducer from './slices/page_reducer';
import socialReducer from './slices/social_reducer';
import spaceReducer from './slices/space_reducer';

export function handleError(resultCode: number): void {
    message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED + ' (' + resultCode + ')');
}

export function handleSuccess(): void {
    message.success(Strings.MYBOOKSHELVE_OPERATION_SUCCESS);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function mainReducer(state = {}, action: any): any {
    let newState = bookReducer(state, action);
    if (newState !== null) return newState;

    newState = notificationReducer(state, action);
    if (newState !== null) return newState;

    newState = pageReducer(state, action);
    if (newState !== null) return newState;

    newState = socialReducer(state, action);
    if (newState !== null) return newState;

    newState = spaceReducer(state, action);
    if (newState !== null) return newState;

    return state;
}
