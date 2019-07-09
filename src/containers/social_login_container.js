import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import SocialLoginComponent from '../components/social_login_component';

function mapStateToProps(state) {
    return {
        userdata: state.socialReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SocialLoginComponent);
