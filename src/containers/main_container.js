import { connect } from 'react-redux'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux'
import MainComponent from '../components/main_component'

function mapStateToProps(state, ownProps) {
    return {
        screen: state.text,
        props: ownProps
    };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainComponent)
