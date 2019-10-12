import { connect } from 'react-redux';
import MainComponent from '../components/regions/main_component';
import { pageAction } from '../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getBooks: filters => dispatch(pageAction.getBooks(filters)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainComponent);
