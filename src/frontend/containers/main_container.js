import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';

function mapStateToProps(state, ownProps) {
    return {
        page: state.mainReducer.page,
        userdata: state.mainReducer.userdata,
        urlparams: ownProps.match.params,
    };
}

export default connect(
    mapStateToProps,
    null,
)(MainComponent);
