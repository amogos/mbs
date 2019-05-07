import { connect } from 'react-redux'
import MainComponent from '../components/main_component'

function mapStateToProps(state) {
    return { screen: state.tree.screen };
}

export default connect(
    mapStateToProps,
    null
)(MainComponent)
