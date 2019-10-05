import { connect } from 'react-redux';
import ProfileComponent from '../components/social/profile_component';
import { socialAction } from '../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: data => dispatch(socialAction.loginUser(data)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileComponent);
