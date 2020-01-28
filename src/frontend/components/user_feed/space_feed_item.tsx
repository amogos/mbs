import React from 'react';
import { withRouter } from 'react-router-dom';
import { Comment, Avatar, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { CustomDate } from './../../../shared/utils/CustomDate';
import { withStyle } from './../hooks/hooks';
import { SpaceType, AppPages } from '../../../shared/types';
import { History } from 'history';

interface Props {
    item: DataTypes.UserFeedRecordType;
    history: History;
}

const SpaceFeedItem = (props: Props) => {
    const { item } = props;
    const title = `${item.user.name}  ${DataTypes.UserFeedTypeToString(item.type)} ${new CustomDate(
        item.date,
    ).toString()} `;

    const actions = [
        <Button className="feed_button" onClick={() => {}}>
            follow
        </Button>,
    ];

    const space = item.space as DataTypes.SpaceType;

    return (
        <Comment
            author={<Button type="link">{title}</Button>}
            avatar={<Avatar src={item.user.picture} alt={item.user.name} />}
            content={
                <div className="feed_item_root">
                    <img height="98" src={space.picture} alt="" />
                    <div className="feed_item_right">
                        <Button type="link" onClick={() => props.history.push(`/${AppPages.Books}?sid=${space.id}`)}>
                            {space.title}
                        </Button>
                        {actions[0]}
                    </div>
                </div>
            }
        />
    );
};

export default withRouter(withStyle(SpaceFeedItem, 'space_feed_item'));
