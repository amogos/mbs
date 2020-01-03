import React from 'react';
import { Divider, Affix } from 'antd';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from './../hooks/hooks';
import FeedItem from './feed_item';
import { History } from 'history';

interface Props {
    userfeed: DataTypes.UserFeedRecordType[];
    history: History;
}

const UserFeedComponent = (props: Props) => {
    return (
        <Affix offsetTop={400}>
            <Aux>
                <h2>News Feed</h2>
                <Divider />
                <div className="user_feed_scroll">
                    {props.userfeed === undefined
                        ? null
                        : props.userfeed.map((item, index) => (
                              <div key={index}>
                                  <p>{index}</p>
                                  <FeedItem item={item} />
                              </div>
                          ))}
                </div>
            </Aux>
        </Affix>
    );
};

export default withRouter(withStyle(UserFeedComponent, 'user_feed_component'));
