import React from 'react';
import * as DataTypes from '../../types';
import { List } from 'antd';
import SpaceHolder from './space_holder';

interface Props {
    spaces: DataTypes.SpaceType[];
}

const SpacesComponent = (props: Props) => {
    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={props.spaces}
            renderItem={item => (
                <List.Item>
                    <SpaceHolder item={item} />
                </List.Item>
            )}
        />
    );
};

export default SpacesComponent;
