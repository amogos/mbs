import React from 'react';
import { Comment, Avatar, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { CustomDate } from './../../../shared/utils/CustomDate';
import { withStyle } from './../hooks/hooks';
import { SpaceType } from '../../../shared/types';

interface Props {
    item: DataTypes.UserFeedRecordType;
    followSpace: (spaceId: number, callback: () => void) => void;
}

const SpaceFeedItem = (props: Props) => {
    const { item } = props;
    const title = `${item.user.name}  ${DataTypes.UserFeedTypeToString(item.type)} ${new CustomDate(
        item.date,
    ).toString()} `;

    const actions = [
        <Button
            className="feed_button"
            onClick={() => {
                if (props.item.space !== undefined) {
                    props.followSpace(props.item.space.id, () => {});
                }
            }}
        >
            follow
        </Button>,
    ];

    const space = item.space as DataTypes.SpaceType;

    return (
        <Comment
            author={<a>{title}</a>}
            avatar={<Avatar src={item.user.picture} alt={item.user.name} />}
            content={
                <p>
                    <div className="feed_item_root">
                        <img height="64" src={space.picture} />
                        <div className="feed_item_right">
                            {space.title}
                            {actions[0]}
                        </div>
                    </div>
                </p>
            }
        />
    );
};

export default withStyle(SpaceFeedItem, 'space_feed_item');
