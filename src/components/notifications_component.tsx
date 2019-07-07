import React from 'react';
import { List, Avatar } from 'antd';
import * as DataTypes from './../types';

interface Props {
    notifications: DataTypes.RentalNotificationType[];
    confirmRental(key: number, user: DataTypes.UserRecordType): void;
    rejectRental(key: number, user: DataTypes.UserRecordType): void;
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
                            <a onClick={() => props.confirmRental(item.bookId, item.user)}>confirm</a>,
                            <a onClick={() => props.rejectRental(item.bookId, item.user)}>reject</a>,
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
