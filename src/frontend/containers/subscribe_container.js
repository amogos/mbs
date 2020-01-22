import { connect } from 'react-redux';
import SubscribeComponent from '../components/subscription/subscribe_component';
import { spaceAction } from '../actions';

function mapStateToProps(state) {
    return {
        urlparams: state.mainReducer.urlparams,
        subscribingSpace: state.mainReducer.subscribingSpace,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        subscribeSpace: (spaceId, onSuccess, onFail) =>
            dispatch(spaceAction.subscribeSpace(spaceId, onSuccess, onFail)),
        exitSubscribeSpace: spaceId => dispatch(spaceAction.exitSubscribeSpace(spaceId)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent);
