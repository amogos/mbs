import React from 'react';
import { List, Avatar } from 'antd';
import * as DataTypes from './../types';

interface Props {
    notifications: DataTypes.BookPendingNotification[];
    confirmRental(key: number, user: DataTypes.UserType): void;
    rejectRental(key: number, user: DataTypes.UserType): void;
}

const NotificationComponent = (props: Props) => {
    return (
        <div>
            <List
                dataSource={props.notifications}
                bordered
                renderItem={item => (
                    <List.Item
                        actions={[
                            <a onClick={() => props.confirmRental(item.bookKey, item.user)}>confirm</a>,
                            <a onClick={() => props.rejectRental(item.bookKey, item.user)}>reject</a>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                            }
                            title={<a href="https://ant.design/index-cn">{item.user}</a>}
                            description={item.bookTitle}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NotificationComponent;
