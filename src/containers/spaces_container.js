import { connect } from 'react-redux';
import SpacesComponent from '../components/spaces/spaces_component';

function mapStateToProps(state) {
    return {
        spaces: state.mainReducer.spaces,
    };
}

export default connect(
    mapStateToProps,
    null,
)(SpacesComponent);
