import { connect } from 'react-redux'
import MainComponent from '../components/main_component'

function mapStateToProps(state) {
    return { action: state.tree.action };
}

export default connect(
    mapStateToProps,
    null
)(MainComponent)
