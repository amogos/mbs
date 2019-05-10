import { connect } from 'react-redux'
import ListBooksComponent from '../components/list_books_component'

function mapStateToProps(state) {
    return {
        userdata: state.tree.userdata,
        changingkey: state.tree.changingkey,
        action: state.tree.action
    };
}

export default connect(
    mapStateToProps,
    null
)(ListBooksComponent)