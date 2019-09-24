import { connect } from 'react-redux';
import { socialAction } from '../actions/';
import FacebookComponent from '../components/social/facebook_component';

const mapDispatchToProps = dispatch => {
    return {
        loginUser: data => dispatch(socialAction.loginUser(data)),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(FacebookComponent);
