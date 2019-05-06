import { connect } from 'react-redux'
import ListBooksComponent from '../components/list_books_component'

function mapStateToProps(state) {
    alert(JSON.stringify(state))
    return {
        action: state.tree.action,
        books_array: state.tree.books_array,
        userdata: state.tree.userdata
    };
}

export default connect(
    mapStateToProps,
    null
)(ListBooksComponent)