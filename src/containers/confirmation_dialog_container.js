import { connect } from 'react-redux'
import ConfirmationDialogComponent from '../components/confirmation_dialog_component'

function mapStateToProps(state) {
    return {
        message: state.tree.action
    };
}

export default connect(
    mapStateToProps,
    null
)(ConfirmationDialogComponent)