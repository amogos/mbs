import { connect } from 'react-redux';
import * as Actions from '../actions/slices/page_actions';
import { bindActionCreators } from 'redux';
import SocialLoginComponent from '../components/social/social_login_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SocialLoginComponent);
