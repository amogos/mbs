import React from 'react';
import { withRouter } from 'react-router-dom';
import * as DataTypes from '../../../shared/types';
import { Aux, withStyle } from '../hooks/hooks';
import FeedItem from './feed_item';
import { History } from 'history';

interface Props {
    userFeed: DataTypes.UserFeedRecordType[];
    history: History;
}

const UserFeedComponentBig = (props: Props) => {
    return (
        <Aux>
            {props.userFeed === undefined
                ? null
                : React.Children.toArray(
                      props.userFeed.map((item, index) => (
                          <div>
                              <p>{index}</p>
                              <FeedItem item={item} />
                          </div>
                      )),
                  )}
        </Aux>
    );
};

export default withRouter(withStyle(UserFeedComponentBig, 'user_feed_component_big'));
