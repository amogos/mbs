import { connect } from 'react-redux'
import * as Actions from '../actions/index'
import BannerComponent from '../components/banner_component'


const mapDispatchToProps = dispatch => {
    return {
        listBooks: () => dispatch(Actions.listBooks()),
        addBook: () => dispatch(Actions.addBook()),
        dispatch
    }
}
export default connect(
    null,
    mapDispatchToProps
)(BannerComponent)