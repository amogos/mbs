import { connect } from 'react-redux';
import UserFeedComponentSmall from '../components/user_feed/user_feed_component_small';

function mapStateToProps(state) {
    return {
        userfeed: state.mainReducer.userfeed,
    };
}

export default connect(mapStateToProps, null)(UserFeedComponentSmall);
