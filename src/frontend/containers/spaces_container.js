import { connect } from 'react-redux';
import SpacesComponent from '../components/spaces/spaces_component';
import { pageAction } from './../actions';

function mapStateToProps(state) {
    return {
        spaces: state.mainReducer.spaces,
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
