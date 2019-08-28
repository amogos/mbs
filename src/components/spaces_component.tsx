import React from 'react';
import * as DataTypes from '../types';
import { Card, Icon, Avatar, List } from 'antd';

interface Props {
    spaces: DataTypes.SpaceType[];
}

const { Meta } = Card;

const SpacesComponent = (props: Props) => {
    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={props.spaces}
            renderItem={item => (
                <List.Item>
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
                            avatar={<Avatar src={item.user.picture} />}
                            title={item.user.name}
                            description={item.nbooks}
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default SpacesComponent;
