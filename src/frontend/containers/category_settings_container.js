import { connect } from 'react-redux';
import CategorySettingsComponent from '../../frontend/components/settings/category_settings_component';
import * as Action from './../actions';

function mapStateToProps(state) {
    return {
        categories: state.mainReducer.categories,
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: user => dispatch(Action.updateUserData(user)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySettingsComponent);
