import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SocialLoginComponent from './social_login_component'

Enzyme.configure({ adapter: new Adapter() })

const setup = (userdata) => {

    const component = shallow(
        <SocialLoginComponent userdata={userdata} />
    )

    return {
        component: component,
    }
}
describe('SocialLoginComponent', () => {
    it('should render welcome message when userdata available', () => {
        const { component } = setup({ name: "mockuser", email: "mockusr@gmail.com" })
        expect(component.text()).toBe("Welcome: mockuser")
    })
})
