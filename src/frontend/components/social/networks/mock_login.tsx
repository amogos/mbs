import React from 'react';
import * as DataTypes from '../../../../shared/types';
import { Button } from 'antd';
import { withStyle } from '../../aux_component';

interface Props {
    loginUser(userInfo: DataTypes.UserValueType): void;
}
const MockLogin = (props: Props) => {
    return (
        <Button
            onClick={() => {
                const userInfo: DataTypes.UserValueType = {
                    name: 'Iulia Mogos',
                    email: 'daosmistique@yahoo.com',
                    picture: '',
                    rating: 0,
                };
                props.loginUser(userInfo);
            }}
        >
            MockLogin
        </Button>
    );
};

export default withStyle(MockLogin, 'mock_login');
