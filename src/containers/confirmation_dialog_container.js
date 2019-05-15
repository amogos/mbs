import { connect } from 'react-redux'
import * as Actions from '../actions/index'
import ConfirmationDialogComponent from '../components/confirmation_dialog_component'

function mapStateToProps(state) {
    return {
        message: state.treeReducer.message
    };
}

const mapDispatchToProps = dispatch => {
    return {
        confirmMessage: (data) => dispatch(Actions.confirmMessage(data)),
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmationDialogComponent)