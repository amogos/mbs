import { connect } from 'react-redux';
import LeftComponent from '../components/regions/left_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
    };
}

export default connect(mapStateToProps, null)(LeftComponent);
