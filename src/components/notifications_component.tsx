import React from 'react';
import { List, Avatar } from 'antd';
import * as DataTypes from './../types';

interface Props {
    notification: DataTypes.BookPendingNotification[];
}

const NotificationComponent = (props: Props) => {
    return (
        <div>
            <List
                dataSource={[
                    {
                        name: 'Lily',
                    },
                    {
                        name: 'Lily',
                    },
                ]}
                bordered
                renderItem={item => (
                    <List.Item actions={[<a onClick={() => {}}>confirm</a>, <a onClick={() => {}}>reject</a>]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                            }
                            title={<a href="https://ant.design/index-cn">{item.name}</a>}
                            description="Progresser AFX"
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NotificationComponent;
