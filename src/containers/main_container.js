import { connect } from 'react-redux'
import * as Actions from '../actions/index'
import MainComponent from '../components/main_component'

function mapStateToProps(state) {
    return { screen: state.tree.screen };
}

const mapDispatchToProps = dispatch => {
    return {
        addUserData: (data) => dispatch(Actions.addUserData(data)),
        dispatch
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainComponent)
