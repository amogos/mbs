import FacebookLogin from './networks/facebook_login';
import GoogleLogin from './networks/google_login';
import MockLogin from './networks/mock_login';
import * as DataTypes from './../../../shared/types';
import Aux, { withStyle } from './../aux_component';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
}

const Login = (props: Props) => {
    return (
        <Aux>
            <FacebookLogin {...props} />
            <GoogleLogin {...props} />
            <MockLogin {...props} />
        </Aux>
    );
};

export default withStyle(Login, 'login');
