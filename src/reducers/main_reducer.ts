import * as DataTypes from '../types';
import Strings from '../constants/string_constant';
import { message } from 'antd';
import bookReducer from './slices/book_reducer';
import notificationReducer from './slices/notification_reducer';
import pageReducer from './slices/page_reducer';
import socialReducer from './slices/social_reducer';

export class GlobalVars {
    public static booksArray: DataTypes.BookRecordType[];
    public static rentalNotificationsArray: DataTypes.RentalNotificationRecordType[];
    public static languagesArray: DataTypes.LanguageRecordType[];
    public static queueArray: DataTypes.QueueRecordType[];
    public static userData: DataTypes.UserRecordType;
}

export function handleError(resultCode: number): void {
    if (resultCode !== 0) {
        message.error(Strings.MYBOOKSHELVE_OPERATION_FAILED + ' (' + resultCode + ')');
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function mainReducer(state = {} as any, action: any): any {
    let newState = bookReducer(state, action);
    if (newState !== null) return newState;

    newState = notificationReducer(state, action);
    if (newState !== null) return newState;

    newState = pageReducer(state, action);
    if (newState !== null) return newState;

    newState = socialReducer(state, action);
    if (newState !== null) return newState;

    return state;
}
