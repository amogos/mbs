import { connect } from 'react-redux';
import RightComponent from '../components/regions/right_component';
import * as Action from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getBookmarks: (userdata, callbacks) => dispatch(Action.getBookmarks(userdata, callbacks)),
        getRentedBooks: (userdata, callbacks) => dispatch(Action.getRentedBooks(userdata, callbacks)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightComponent);
