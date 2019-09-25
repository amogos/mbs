import { connect } from 'react-redux';
import SpacesComponent from '../components/spaces/list_spaces_component';
import { pageAction, spaceAction } from '../actions';

function mapStateToProps(state) {
    return {
        spaces: state.mainReducer.spaces,
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        gotoListBooks: filters => dispatch(pageAction.gotoListBooks(filters)),
        followSpace: spaceId => dispatch(spaceAction.followSpace(spaceId)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SpacesComponent);
