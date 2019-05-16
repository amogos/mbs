import SocialLoginComponent from '../social_login_component'
import * as DataTypes from '../../types'
import renderer from 'react-test-renderer';

jest.mock('./../../containers/facebook_container', () => 'login button')

test('Render username if logged in', () => {
    const component = renderer.create(
        SocialLoginComponent({ userdata: { name: "mockuser", email: "mockusr@gmail.com" } })
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render login button if not logged in yet', () => {
    const component = renderer.create(
        SocialLoginComponent({ userdata: DataTypes.nullUser })
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});