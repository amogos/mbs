import React from 'react';
import { withRouter } from 'react-router-dom';
import Tabs, { TabData } from '../banner/tabs';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import { withStyle } from '../hooks/hooks';
import { History } from 'history';

interface Props {
    getSpaces(filters: string[]): void;
    categories: DataTypes.CategoryRecordType[];
    usercategories: DataTypes.CategoryRecordType[];
    history: History;
}

const BuildCategoryTabsInformation = (props: Props) => {
    let categoryTabsContent: TabData[] = [];
    const { CategoryTabsStrings } = Strings.default;
    const numMinumumVisibleTabs = 10;

    if (!props.categories) return categoryTabsContent;

    //  HOME category tab
    categoryTabsContent.push({
        id: -1,
        title: CategoryTabsStrings.HOME,
        callback: () => {
            props.history.push('/spaces');
        },
    });

    //  add user preferred categories
    categoryTabsContent = categoryTabsContent.concat(
        props.usercategories.map(item => {
            const tab: TabData = {
                id: item.id,
                title: item.title,
                callback: () => props.history.push(`/books?category=${item.id}`),
            };
            return tab;
        }),
    );

    //  add extra random categories if minimum number of visible tabs not reached
    if (numMinumumVisibleTabs > props.usercategories.length) {
        const extraCategories = props.categories.filter(
            element => props.usercategories.find(match => match.id === element.id) === undefined,
        );
        categoryTabsContent = categoryTabsContent.concat(
            extraCategories.slice(1, numMinumumVisibleTabs - props.usercategories.length + 1).map(item => {
                const tab: TabData = {
                    id: item.id,
                    title: item.title,
                    callback: () => props.history.push(`/books?category=${item.id}`),
                };
                return tab;
            }),
        );
    }

    //  MORE category tab
    categoryTabsContent.push({ id: -2, title: CategoryTabsStrings.MORE, callback: () => {} });

    return categoryTabsContent;
};

const CategoryTabs = (props: Props) => {
    const tabs = BuildCategoryTabsInformation(props);
    return <Tabs tabs={tabs} />;
};

export default withRouter(withStyle(CategoryTabs, 'category_tabs'));
