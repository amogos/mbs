import { connect } from 'react-redux';
import { pageAction } from '../actions/';
import BannerComponent from '../components/banner_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        categoriesArray: state.mainReducer.categoriesArray,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        gotoListBooks: filters => dispatch(pageAction.gotoListBooks(filters)),
        gotoAddBook: () => dispatch(pageAction.gotoAddBook()),
        gotoNotifications: () => dispatch(pageAction.gotoNotifications()),
        dispatch,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BannerComponent);
