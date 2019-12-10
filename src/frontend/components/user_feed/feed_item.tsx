import * as DataTypes from '../../../shared/types';
import BookFeedItem from './book_feed_item';

const FeedItem = (props: { item: DataTypes.UserFeedRecordType }) => {
    const { item } = props;
    switch (item.type) {
        case DataTypes.UserFeedType.REMOVED_BOOK:
        case DataTypes.UserFeedType.REQUESTED_BOOK:
        case DataTypes.UserFeedType.RENTED_BOOK:
        case DataTypes.UserFeedType.RATED_BOOK:
        case DataTypes.UserFeedType.ADDED_BOOK:
        case DataTypes.UserFeedType.LIKES_BOOK: {
            return <BookFeedItem {...props} />;
        }

        default:
            return null;
    }
};

export default FeedItem;
