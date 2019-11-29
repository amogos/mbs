import React from 'react';
import { withRouter } from 'react-router-dom';
import Tabs, { TabData } from '../banner/tabs';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import { withStyle } from '../hooks/hooks';

interface Props {
    getSpaces(filters: string[]): void;
    categories: DataTypes.CategoryRecordType[];
    history: any;
}

const BuildCategoryTabsInformation = (props: Props) => {
    let categoryTabsContent: TabData[] = [];
    const { CategoryTabsStrings } = Strings.default;

    if (!props.categories) return categoryTabsContent;

    categoryTabsContent.push({
        id: -1,
        title: CategoryTabsStrings.HOME,
        callback: () => {
            props.history.push('/spaces');
        },
    });

    categoryTabsContent = categoryTabsContent.concat(
        props.categories.slice(1, 11).map(item => {
            const tab: TabData = {
                id: item.id,
                title: item.title,
                callback: () => props.history.push(`/books?category=${item.id}`),
            };
            return tab;
        }),
    );

    categoryTabsContent.push({ id: -2, title: CategoryTabsStrings.MORE, callback: () => {} });

    return categoryTabsContent;
};

const CategoryTabs = (props: Props) => {
    const tabs = BuildCategoryTabsInformation(props);
    return <Tabs tabs={tabs} />;
};

export default withRouter(withStyle(CategoryTabs, 'category_tabs'));
