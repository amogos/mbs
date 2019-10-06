import React from 'react';
import * as DataTypes from '../../../shared/types';
import { Avatar } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
}

const ProfileComponent = (props: Props) => {
    return <Avatar src={props.userdata.picture} />;
};

export default ProfileComponent;
