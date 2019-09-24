import React from 'react';
import * as DataTypes from '../../../shared/types';
import { List } from 'antd';
import SpaceHolder from './space_holder';

interface Props {
    spaces: DataTypes.SpaceType[];
    userdata: DataTypes.UserRecordType;
    gotoListBooks(filters: string[]): void;
}

const ListSpacesComponent = (props: Props) => {
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
                    <SpaceHolder item={item} onClick={() => onSpaceClicked(item.id)} userdata={props.userdata} />
                </List.Item>
            )}
        />
    );
};

export default ListSpacesComponent;
