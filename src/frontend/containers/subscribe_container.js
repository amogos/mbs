import { connect } from 'react-redux';
import SubscribeComponent from '../components/subscription/subscribe_component';
import * as Action from '../actions';

function mapStateToProps(state) {
    return {
        urlparams: state.mainReducer.urlparams,
        subscribingSpace: state.mainReducer.subscribingSpace,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        subscribeSpace: (spaceId, onSuccess, onFail) => dispatch(Action.subscribeSpace(spaceId, onSuccess, onFail)),
        exitSubscribeSpace: spaceId => dispatch(Action.exitSubscribeSpace(spaceId)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent);
