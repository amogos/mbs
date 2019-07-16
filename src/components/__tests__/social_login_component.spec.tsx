import SocialLoginComponent from '../social_login_component';
import * as DataTypes from '../../types';
import renderer from 'react-test-renderer';

jest.mock('./../../containers/facebook_container', () => 'login button');

test('Render username if logged in', () => {
    const component = renderer.create(
        SocialLoginComponent({
            userdata: { value: { name: 'mockuser', email: 'mockusr@gmail.com' } as DataTypes.UserValueType, id: 1 },
        }),
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Render login button if not logged in yet', () => {
    const component = renderer.create(SocialLoginComponent({ userdata: DataTypes.nullUser() }));
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
