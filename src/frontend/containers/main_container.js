import { connect } from 'react-redux';
import MainComponent from '../components/main_component';

function mapStateToProps(state) {
    return { action: state.mainReducer.action };
}

export default connect(
    mapStateToProps,
    null,
)(MainComponent);
