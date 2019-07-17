import BookAction from './slices/book_actions';
import NotificationAction from './slices/notification_actions';
import SocialAction from './slices/social_actions';
import PageAction from './slices/page_actions';

export const bookAction = new BookAction();
export const notificationAction = new NotificationAction();
export const socialAction = new SocialAction();
export const pageAction = new PageAction();
