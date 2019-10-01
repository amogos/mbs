import React from 'react';
import { withStyle } from '../aux_component';
import Aux from './../aux_component';
import { Divider } from 'antd';
import * as DataTypes from './../../../shared/types';
import * as ActionTypes from './../../../shared/constants/action_constant';

const { PageActionConstant } = ActionTypes.default;

interface Props {
    page: string;
    userdata: DataTypes.UserRecordType;
}

const RightComponent = (props: Props) => {
    const loggedIn = props.userdata && props.userdata !== DataTypes.NullUser;
    const shouldBeVisible = props.page != PageActionConstant.ACTION_GOTO_SPACES;

    if (loggedIn && shouldBeVisible)
        return (
            <Aux>
                POPULAR ON FLIP
                <Divider />
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> </p>
                READING LIST
                <Divider />
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
                <p> text </p>
            </Aux>
        );
    return null;
};

export default withStyle(RightComponent, 'right_component');
