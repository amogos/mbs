import { connect } from 'react-redux';
import UserFeedComponentSmall from '../components/user_feed/user_feed_component_small';

function mapStateToProps(state) {
    return {
        userFeed: state.mainReducer.userFeed,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserFeedComponentSmall);
