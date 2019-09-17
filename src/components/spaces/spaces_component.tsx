import React from 'react';
import * as DataTypes from '../../types';
import { List } from 'antd';
import SpaceHolder from './space_holder';

interface Props {
    spaces: DataTypes.SpaceType[];
    gotoListBooks(filters: string[]): void;
}

const SpacesComponent = (props: Props) => {
    const onSpaceClicked = (spaceId: number) => {
        let filters = [`space=${spaceId}`];
        props.gotoListBooks(filters);
    };

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={props.spaces}
            renderItem={item => (
                <List.Item>
                    <SpaceHolder item={item} onClick={() => onSpaceClicked(item.id)} />
                </List.Item>
            )}
        />
    );
};

export default SpacesComponent;
