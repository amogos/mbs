export * from './types/user_types';
export * from './types/book_types';
export * from './types/language_types';
export * from './types/category_types';
export * from './types/return_notification_types';
export * from './types/space_types';
export * from './types/book_review_types';
export * from './types/user_review_types';
export * from './types/format_types';
export * from './types/queue_notification_types';
export * from './types/book_description_types';

export interface BannerAttributes {
    showCategoryFiltering: boolean;
    showTabFiltering: boolean;
}

export interface UrlParms {
    id: string;
    query: { category?: number; space?: number; id?: number };
}
