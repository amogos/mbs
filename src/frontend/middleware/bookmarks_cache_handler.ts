import CacheHandler from './cache_handler';
import * as DataTypes from './../../shared/types';
import * as ActionConstants from './../../shared/constants/action_constant';
import { pageAction } from './../actions';
const { PageActionConstant, BookActionConstant } = ActionConstants.default;

export default class BookmarksCacheHandler extends CacheHandler {
    bookmarksCache: DataTypes.BookRecordType[] = [];

    public handle(store: any, action: any, next: any): any {
        switch (action.type) {
            case BookActionConstant.ACTION_BOOKMARK_BOOK:
                this.invalidate();
                break;
            case BookActionConstant.ACTION_UNBOOKMARK_BOOK:
                this.invalidate();
                break;
            case PageActionConstant.ACTION_GET_BOOKMARKS:
                if (this.bookmarksCache.length > 0) {
                    return store.dispatch(
                        pageAction.refreshState({ userBookmarks: this.bookmarksCache, append: false }),
                    );
                } else {
                    action.callbacks.push((bookmarks: DataTypes.BookRecordType[]) => (this.bookmarksCache = bookmarks));
                }
                break;
        }
        return next(action);
    }
    public invalidate(): void {
        this.bookmarksCache = [];
    }
}
