import { connect } from 'react-redux';
import UserFeedComponent from '../components/user_feed/user_feed_component';

function mapStateToProps(state) {
    return {
        userfeed: state.mainReducer.userfeed,
    };
}

export default connect(mapStateToProps, null)(UserFeedComponent);
