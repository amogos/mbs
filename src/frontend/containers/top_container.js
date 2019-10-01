import { connect } from 'react-redux';
import TopComponent from '../components/regions/top_component';

function mapStateToProps(state) {
    return { page: state.mainReducer.page };
}

export default connect(
    mapStateToProps,
    null,
)(TopComponent);
