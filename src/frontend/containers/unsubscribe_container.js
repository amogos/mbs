import { connect } from 'react-redux';
import UnSubscribeComponent from '../components/subscription/unsubscribe_component';
import * as Action from '../actions';

function mapStateToProps(state) {
    return {
        urlparams: state.mainReducer.urlparams,
        space: state.mainReducer.space,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        unsubscribeSpace: (spaceId, onSuccess, onFail) => dispatch(Action.unsubscribeSpace(spaceId, onSuccess, onFail)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnSubscribeComponent);
