import { connect } from 'react-redux'
import * as Actions from '../actions'
import AddNewBookComponent from '../components/add_new_book_component'

function mapStateToProps(state) {
    return {
        userdata: state.treeReducer.userdata,
        action: state.treeReducer.action
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addBook: (data) => dispatch(Actions.addBook(data)),
        dispatch
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewBookComponent)