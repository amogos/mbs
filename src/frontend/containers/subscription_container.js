import { connect } from 'react-redux';
import SubscriptionComponent from '../components/subscription/subscription_component';

function mapStateToProps(state) {
    return {
        urlparams: state.mainReducer.urlparams,
        subscribingSpace: state.mainReducer.subscribingSpace,
    };
}

export default connect(mapStateToProps, null)(SubscriptionComponent);
