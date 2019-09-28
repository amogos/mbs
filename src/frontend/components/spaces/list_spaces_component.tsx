import React from 'react';
import * as DataTypes from '../../../shared/types';
import { List, Carousel } from 'antd';
import SpaceHolder from './space_holder';

interface Props {
    spaces: DataTypes.Spaces;
    userdata: DataTypes.UserRecordType;
    gotoListBooks(filters: string[]): void;
    followSpace: (spaceId: number, callback: () => void) => void;
    unfollowSpace: (spaceId: number, callback: () => void) => void;
}

const ListSpacesComponent = (props: Props) => {
    const onSpaceClicked = (spaceId: number) => {
        let filters = [`space=${spaceId}`];
        props.gotoListBooks(filters);
    };

    function onChange(slideNumber: number) {}

    return (
        <div className="space_list">
            <p className="thicker">All Spaces</p>
            <p className="thicker">My Spaces</p>
            <Carousel afterChange={onChange}>
                {props.spaces.userSpaces.map(item => (
                    <SpaceHolder
                        item={item}
                        followSpace={props.followSpace}
                        unfollowSpace={props.unfollowSpace}
                        onClick={() => onSpaceClicked(item.id)}
                        userdata={props.userdata}
                    />
                ))}
            </Carousel>
            <p />
            <p className="thicker">Other Spaces</p>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={props.spaces.otherSpaces}
                renderItem={item => (
                    <List.Item>
                        <SpaceHolder
                            item={item}
                            followSpace={props.followSpace}
                            unfollowSpace={props.unfollowSpace}
                            onClick={() => onSpaceClicked(item.id)}
                            userdata={props.userdata}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ListSpacesComponent;
