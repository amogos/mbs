import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';

function mapStateToProps(state) {
    return { page: state.mainReducer.page, userdata: state.mainReducer.userdata };
}

export default connect(
    mapStateToProps,
    null,
)(MainComponent);
