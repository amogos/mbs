import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import * as DataTypes from '../../types';

const { Meta } = Card;

interface Props {
    item: DataTypes.SpaceType;
}

const SpaceHolder = (props: Props) => {
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="https://static1.squarespace.com/static/52e90e99e4b04f8e0ba4b3f8/t/5980a7c9cd39c3a86f4d57aa/1501603792367/"
                />
            }
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
            <Meta
                avatar={<Avatar src={props.item.user.picture} />}
                title={props.item.user.name}
                description={props.item.nbooks}
            />
        </Card>
    );
};

export default SpaceHolder;
