import * as ActionConstants from './../../shared/constants/action_constant';
import BookmarksCacheHandler from './bookmarks_cache_handler';
import BooksCacheHandler from './books_cache_handler';
import FeedsCacheHandler from './feeds_cache_handler';
import SpacesCacheHandler from './spaces_cache_handler';

const { PageActionConstant, BookActionConstant } = ActionConstants.default;

const booksCacheHandler = new BooksCacheHandler();
const feedsCacheHandler = new FeedsCacheHandler();
const bookmarksCacheHandler = new BookmarksCacheHandler();
const spacesCacheHandler = new SpacesCacheHandler();

const dispatchCacher = store => next => action => {
    switch (action.type) {
        case BookActionConstant.ACTION_ADD_BOOK:
        case PageActionConstant.ACTION_GET_BOOKS:
        case BookActionConstant.ACTION_LIKE_BOOK:
            return booksCacheHandler.handle(store, action, next);
        case BookActionConstant.ACTION_BOOKMARK_BOOK:
        case BookActionConstant.ACTION_UNBOOKMARK_BOOK:
        case PageActionConstant.ACTION_GET_BOOKMARKS:
            return bookmarksCacheHandler.handle(store, action, next);
        case PageActionConstant.ACTION_GET_FEED:
            return feedsCacheHandler.handle(store, action, next);
        case PageActionConstant.ACTION_GET_SPACES:
            return spacesCacheHandler.handle(store, action, next);
        default:
            break;
    }

    return next(action);
};

export default dispatchCacher;
