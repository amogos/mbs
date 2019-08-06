import React, { useState } from 'react';
import * as DataTypes from './../types';
import { Icon, Tabs, Select } from 'antd';

const { Option } = Select;

interface Props {
    categories: DataTypes.CategoryRecordType[];
    gotoListBooks(filters: string[]): void;
    tabIds: string[];
    filters: string[][];
    defaultTabIndex: number;
    icons: string[];
    titles: string[];
}

const FilteringTabsComponent = (props: Props) => {
    const { TabPane } = Tabs;
    const tabIds = props.tabIds;
    const [tab, setTab] = useState(tabIds[props.defaultTabIndex]);
    const [categoryFilters, setCategoryFilters] = useState(['']);

    function handleMultiFilterChange(value: string[]) {
        let filters: string[] = [];

        value.forEach(category => {
            filters = [...filters, 'category=' + category];
        });

        setCategoryFilters(filters);

        filters = filters.concat(props.filters[props.defaultTabIndex]);
        props.gotoListBooks(filters);
    }

    function CategoriesSelection(props: Props) {
        const children: any[] = [];
        props.categories.forEach(category => children.push(<Option key={category.id}>{category.title}</Option>));
        return children;
    }

    function TabsListing(props: Props) {
        const children: any[] = [];
        props.tabIds.forEach((value, index) =>
            children.push(
                <TabPane
                    tab={
                        <span>
                            <Icon type={props.icons[index]} />
                            {props.titles[index]}
                        </span>
                    }
                    key={value}
                />,
            ),
        );
        return children;
    }

    const onTabSelectionChanged = (key: string) => {
        let filters: string[] = [];
        props.tabIds.forEach((value, index) => {
            if (key === value) {
                filters = props.filters[index];
                filters = filters.concat(categoryFilters);
                setTab(key);
            }
        });
        props.gotoListBooks(filters);
    };

    return (
        <span>
            <Tabs defaultActiveKey={tab} onChange={(key: string) => onTabSelectionChanged(key)}>
                {TabsListing(props)}
            </Tabs>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Filter by category"
                onChange={handleMultiFilterChange}
            >
                {CategoriesSelection(props)}
            </Select>
        </span>
    );
};

export default FilteringTabsComponent;
