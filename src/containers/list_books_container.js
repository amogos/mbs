import { connect } from 'react-redux'
import ListBooksComponent from '../components/list_books_component'

function mapStateToProps(state) {
    return {
        action: state.tree.action,
        userdata: state.tree.userdata
    };
}

export default connect(
    mapStateToProps,
    null
)(ListBooksComponent)