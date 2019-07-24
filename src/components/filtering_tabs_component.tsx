import React, { useState } from 'react';
import * as DataTypes from './../types';
import { Icon, Tabs } from 'antd';
import * as Strings from './../constants/string_constant';

const { FilteringTabsStrings } = Strings.default;

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
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_OWNED_BOOKS}
                    </span>
                }
                key="1"
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_RENTED_BOOKS}
                    </span>
                }
                key="2"
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_ALL_BOOKS}
                    </span>
                }
                key="3"
            />
        </Tabs>
    );
};

export default FilteringTabsComponent;
