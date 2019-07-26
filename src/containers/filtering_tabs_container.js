import { connect } from 'react-redux';
import FilteringTabsComponent from '../components/filtering_tabs_component';
import { pageAction } from '../actions';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        categoriesArray: state.mainReducer.categoriesArray,
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
)(FilteringTabsComponent);
