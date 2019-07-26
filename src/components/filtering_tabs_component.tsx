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
    const [filter, setFilter] = useState('3');

    function handleMultiFilterChange(value: any) {}

    function getCategories(props: Props) {
        const children: any[] = [];
        props.categoriesArray.forEach(category => children.push(<Option key={category.id}>{category.title}</Option>));
        return children;
    }

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
                key="3"
            />
        </Tabs>
    );
};

export default FilteringTabsComponent;
