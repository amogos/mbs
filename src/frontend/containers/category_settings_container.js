import { connect } from 'react-redux';
import CategorySettingsComponent from '../../frontend/components/settings/category_settings_component';
import { socialAction } from './../actions';

function mapStateToProps(state) {
    return {
        categories: state.mainReducer.categories,
        userdata: state.mainReducer.userdata,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: user => dispatch(socialAction.updateUser(user)),
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySettingsComponent);
