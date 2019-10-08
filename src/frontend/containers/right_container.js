import { connect } from 'react-redux';
import RightComponent from '../components/regions/right_component';

function mapStateToProps(state, ownProps) {
    return {
        page: state.mainReducer.page,
        userdata: state.mainReducer.userdata,
    };
}

export default connect(
    mapStateToProps,
    null,
)(RightComponent);
