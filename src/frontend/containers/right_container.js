import { connect } from 'react-redux';
import RightComponent from '../components/regions/right_component';
import { pageAction } from './../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        urlparams: state.mainReducer.urlparams,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getBookmarks: (userdata, callbacks) => dispatch(pageAction.getBookmarks(userdata, callbacks)),
        getRentedBooks: (userdata, callbacks) => dispatch(pageAction.getRentedBooks(userdata, callbacks)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightComponent);
