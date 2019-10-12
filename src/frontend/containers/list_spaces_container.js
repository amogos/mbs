import { connect } from 'react-redux';
import SpacesComponent from '../components/spaces/list_spaces_component';
import { pageAction, spaceAction, bookAction } from '../actions';

function mapStateToProps(state) {
    return {
        spaces: state.mainReducer.spaces,
        userdata: state.mainReducer.userdata,
        categories: state.mainReducer.categories,
        languages: state.mainReducer.languages,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getBooks: filters => dispatch(pageAction.getBooks(filters)),
        followSpace: (spaceId, callback) => dispatch(spaceAction.followSpace(spaceId, callback)),
        unfollowSpace: (spaceId, callback) => dispatch(spaceAction.unfollowSpace(spaceId, callback)),
        addBook: data => dispatch(bookAction.addBook(data)),
        dispatch,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SpacesComponent);
