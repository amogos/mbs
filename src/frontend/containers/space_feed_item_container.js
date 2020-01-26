import { connect } from 'react-redux';
import SpaceFeedItemComponent from '../components/user_feed/space_feed_item';
import * as Action from '../actions';

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    };
};
export default connect(null, mapDispatchToProps)(SpaceFeedItemComponent);
