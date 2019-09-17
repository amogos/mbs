import React, { useState } from 'react';
import * as DataTypes from '../../types';
import { Icon, Tabs } from 'antd';

interface Props {
    categories: DataTypes.CategoryRecordType[];
    tabIds: string[];
    filters: string[][];
    defaultTabIndex: number;
    icons: string[];
    titles: string[];
    categoryFilters: string[];
    onFiltersChanged?: (filters: string[]) => void;
}

const FilteringTabsComponent = (props: Props) => {
    const { TabPane } = Tabs;
    const tabIds = props.tabIds;
    const [tab, setTab] = useState(tabIds[props.defaultTabIndex]);

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
                filters = filters.concat(props.categoryFilters);
                setTab(key);
            }
        });
        if (props.onFiltersChanged) props.onFiltersChanged(filters);
    };

    return (
        <span>
            <Tabs defaultActiveKey={tab} onChange={(key: string) => onTabSelectionChanged(key)}>
                {TabsListing(props)}
            </Tabs>
        </span>
    );
};

export default FilteringTabsComponent;
