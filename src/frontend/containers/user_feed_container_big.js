import { connect } from 'react-redux';
import UserFeedComponentBig from '../components/user_feed/user_feed_component_big';

function mapStateToProps(state) {
    return {
        userfeed: state.mainReducer.userfeed,
    };
}

export default connect(mapStateToProps, null)(UserFeedComponentBig);
