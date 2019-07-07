import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import FacebookComponent from '../components/facebook_component';

const mapDispatchToProps = dispatch => {
    return {
        loginUser: data => dispatch(Actions.loginUser(data)),
        dispatch,
    };
};
export default connect(
    null,
    mapDispatchToProps,
)(FacebookComponent);
