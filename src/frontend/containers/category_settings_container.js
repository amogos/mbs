import { connect } from 'react-redux';
import CategorySettingsComponent from '../../frontend/components/settings/category_settings_component';

function mapStateToProps(state) {
    return {
        categories: state.mainReducer.categories,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySettingsComponent);
