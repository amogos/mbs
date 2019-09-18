import { connect } from 'react-redux';
import { pageAction } from '../actions/';
import BannerComponent from '../components/banner/banner_component';

function mapStateToProps(state) {
    return {
        userdata: state.mainReducer.userdata,
        categories: state.mainReducer.categories,
        languages: state.mainReducer.languages,
        action: state.mainReducer.action,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        gotoListBooks: filters => dispatch(pageAction.gotoListBooks(filters)),
        gotoSpaces: () => dispatch(pageAction.gotoSpaces()),
        gotoNotifications: () => dispatch(pageAction.gotoNotifications()),
        addBook: data => dispatch(pageAction.addBook(data)),
        dispatch,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BannerComponent);
