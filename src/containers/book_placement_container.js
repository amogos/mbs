import { connect } from 'react-redux'
import * as Actions from '../actions/index'
import BookPlacementComponent from '../components/book_placement_component'

const mapDispatchToProps = dispatch => {
    return {
        assignBook: (book_key) => dispatch(Actions.assignBook(book_key)),
        returnBook: (book_key) => dispatch(Actions.returnBook(book_key)),
        dispatch
    }
}
export default connect(
    null,
    mapDispatchToProps
)(BookPlacementComponent)
