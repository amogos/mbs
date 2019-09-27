import { connect } from 'react-redux';
import MainComponent from '../components/main_component';

function mapStateToProps(state) {
    return { page: state.mainReducer.page };
}

export default connect(
    mapStateToProps,
    null,
)(MainComponent);
