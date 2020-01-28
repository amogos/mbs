import { BookAction } from './slices/book_actions';
import { PageAction } from './slices/page_actions';
import { SpaceAction } from './slices/space_actions';
import { NotificationAction } from './slices/notification_actions';
import { SocialAction } from './slices/social_actions';

export * from './slices/book_actions';
export * from './slices/notification_actions';
export * from './slices/social_actions';
export * from './slices/page_actions';
export * from './slices/space_actions';

export type AppActions = BookAction | NotificationAction | PageAction | SocialAction | SpaceAction;
