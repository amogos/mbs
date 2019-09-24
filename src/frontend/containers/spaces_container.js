import { connect } from 'react-redux';
import SpacesComponent from '../components/spaces/spaces_component';
import { pageAction } from './../actions';

function mapStateToProps(state) {
    return {
        spaces: state.mainReducer.spaces,
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        gotoListBooks: filters => dispatch(pageAction.gotoListBooks(filters)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SpacesComponent);
