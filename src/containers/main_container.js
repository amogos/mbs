import { connect } from 'react-redux'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux'
import MainComponent from '../components/main_component'

function mapStateToProps(state) {
    return { screen: state.tree[0].screen };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainComponent)
