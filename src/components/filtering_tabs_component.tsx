import React, { useState } from 'react';
import * as DataTypes from './../types';
import { Icon, Tabs, Select } from 'antd';
import * as Strings from './../constants/string_constant';

const { Option } = Select;
const { FilteringTabsStrings } = Strings.default;

interface Props {
    userdata: DataTypes.UserRecordType;
    categoriesArray: DataTypes.CategoryRecordType[];
    gotoListBooks(filters: string[]): void;
}

const FilteringTabsComponent = (props: Props) => {
    const { TabPane } = Tabs;
    const [tab, setTab] = useState('3');
    const tabIds = ['owner', 'holder', 'all'];

    function handleMultiFilterChange(value: string) {
        const filters = ['category=' + value];
        props.gotoListBooks(filters);
    }

    function getCategories(props: Props) {
        const children: any[] = [];
        props.categoriesArray.forEach(category => children.push(<Option key={category.id}>{category.title}</Option>));
        return children;
    }

    const onTabSelectionChanged = (key: string) => {
        setTab(key);

        let filters: string[] = [];

        switch (key) {
            case tabIds[0]:
                {
                    filters = ['owner=' + props.userdata.id];
                }
                break;
            case tabIds[1]:
                {
                    filters = ['holder=' + props.userdata.id];
                }
                break;
        }

        props.gotoListBooks(filters);
    };

    return (
        <Tabs defaultActiveKey={tab} onChange={(key: string) => onTabSelectionChanged(key)}>
            <TabPane
                tab={
                    <span>
                        <Icon type="apple" />
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_OWNED_BOOKS}
                    </span>
                }
                key={tabIds[0]}
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_RENTED_BOOKS}
                    </span>
                }
                key={tabIds[1]}
            />
            <TabPane
                tab={
                    <span>
                        <Icon type="android" />
                        {FilteringTabsStrings.MYBOOKSHELVE_STRING_ALL_BOOKS}
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={handleMultiFilterChange}
                        >
                            {getCategories(props)}
                        </Select>
                        ,
                    </span>
                }
                key={tabIds[2]}
            />
        </Tabs>
    );
};

export default FilteringTabsComponent;
