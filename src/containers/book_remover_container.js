import { connect } from 'react-redux'
import * as Actions from '../actions/index'
import BookRemoverComponent from '../components/book_remover_component'

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: (book_key) => dispatch(Actions.deleteBook(book_key)),
        dispatch
    }
}
export default connect(
    null,
    mapDispatchToProps
)(BookRemoverComponent)