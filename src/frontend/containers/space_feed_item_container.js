import { connect } from 'react-redux';
import SpaceFeedItemComponent from '../components/user_feed/space_feed_item';
import { spaceAction } from '../actions';

const mapDispatchToProps = dispatch => {
    return {
        followSpace: (spaceId, callback) => dispatch(spaceAction.followSpace(spaceId, callback)),
        dispatch,
    };
};
export default connect(null, mapDispatchToProps)(SpaceFeedItemComponent);
