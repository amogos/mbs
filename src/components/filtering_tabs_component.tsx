import React, { useState } from 'react';
import * as DataTypes from './../types';
import { Icon, Tabs } from 'antd';

interface Props {
    userdata: DataTypes.UserRecordType;
    gotoListBooks(filters: string[]): void;
}

const FilteringTabsComponent = (props: Props) => {
    const { TabPane } = Tabs;
    const [filter, setFilter] = useState('3');

    const onTabSelectionChanged = (key: string) => {
        setFilter(key);
        switch (key) {
            case '1':
                {
                    props.gotoListBooks(['owner=' + props.userdata.id]);
                }
                break;
            case '2':
                {
                    props.gotoListBooks(['holder=' + props.userdata.id]);
                }
                break;
            case '3':
                {
                    props.gotoListBooks([]);
                }
                break;
            default:
                {
                    props.gotoListBooks([]);
                }
                break;
        }
    };

    return (
        <Tabs defaultActiveKey={filter} onChange={(key: string) => onTabSelectionChanged(key)}>
            <TabPane
                tab={
                    <span>
                        <Icon type="apple" />
                        Owned Books
                    </span>
                }
                key="1"
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        Rented Books
                    </span>
                }
                key="2"
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        All Books Available
                    </span>
                }
                key="3"
            />
        </Tabs>
    );
};

export default FilteringTabsComponent;
