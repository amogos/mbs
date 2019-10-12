import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
    };
}

export default connect(
    mapStateToProps,
    null,
)(MainComponent);
