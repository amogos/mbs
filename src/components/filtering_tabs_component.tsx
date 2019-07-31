import React, { useState } from 'react';
import * as DataTypes from './../types';
import { Icon, Tabs, Select } from 'antd';
import * as Strings from './../constants/string_constant';

const { Option } = Select;
const { FilteringTabsStrings } = Strings.default;

interface Props {
    categoriesArray: DataTypes.CategoryRecordType[];
    gotoListBooks(filters: string[]): void;
    spaceOwnerId: number;
}

const SpaceFilteringTabsComponent = (props: Props) => {
    const { TabPane } = Tabs;
    const tabIds = ['rented', 'assigned', 'all'];
    const [tab, setTab] = useState(tabIds[2]);
    const [categoryFilters, setCategoryFilters] = useState(['']);

    function handleMultiFilterChange(value: string[]) {
        let filters: string[] = [];
        value.forEach(category => {
            filters = [...filters, 'category=' + category];
        });
        setCategoryFilters(filters);
        filters = [...filters, 'owner=' + props.spaceOwnerId];
        props.gotoListBooks(filters);
    }

    function getCategories(props: Props) {
        const children: any[] = [];
        props.categoriesArray.forEach(category => children.push(<Option key={category.id}>{category.title}</Option>));
        return children;
    }

    const onTabSelectionChanged = (key: string) => {
        let filters: string[] = [];
        switch (key) {
            case tabIds[0]:
                {
                    filters = ['holder=' + props.spaceOwnerId];
                }
                break;
            case tabIds[1]:
                {
                    filters = ['owner=' + props.spaceOwnerId, 'holder_gte=0'];
                }
                break;
            case tabIds[2]:
                {
                    filters = [...categoryFilters, 'owner=' + props.spaceOwnerId];
                }
                break;
        }
        setTab(key);
        props.gotoListBooks(filters);
    };

    return (
        <Tabs defaultActiveKey={tab} onChange={(key: string) => onTabSelectionChanged(key)}>
            <TabPane
                tab={
                    <span>
                        <Icon type="apple" />
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_RENTED}
                    </span>
                }
                key={tabIds[0]}
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_ASSIGNED}
                    </span>
                }
                key={tabIds[1]}
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_ALL} &nbsp;
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Filter by category"
                            onChange={handleMultiFilterChange}
                        >
                            {getCategories(props)}
                        </Select>
                    </span>
                }
                key={tabIds[2]}
            />
        </Tabs>
    );
};

export default SpaceFilteringTabsComponent;
