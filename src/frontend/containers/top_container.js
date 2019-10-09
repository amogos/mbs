import { connect } from 'react-redux';
import TopComponent from '../components/regions/top_component';

function mapStateToProps(state, ownProps) {
    return {
        userdata: state.mainReducer.userdata,
    };
}

export default connect(
    mapStateToProps,
    null,
)(TopComponent);
