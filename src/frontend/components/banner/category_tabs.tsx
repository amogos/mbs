import React from 'react';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';
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

    if (!props.categories || !props.usercategories) return categoryTabsContent;

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
    categoryTabsContent.push({
        id: -2,
        title: CategoryTabsStrings.MORE,
        callback: () => {
            props.history.push('/settings');
        },
    });

    return categoryTabsContent;
};

//  make category tabs stick to the top page when certain scroll offset reached
const updateStyle = () => {
    const scrollAmount = document.documentElement.scrollTop;
    const tabsObject = document.getElementById('category_tabs');
    const scrollNeededForFixedStyle = 160;

    if (!tabsObject) return;

    if (scrollAmount > scrollNeededForFixedStyle) {
        tabsObject.style.setProperty('position', 'fixed');
    } else {
        tabsObject.style.setProperty('position', 'relative');
    }
};

const CategoryTabs = (props: Props) => {
    window.onscroll = debounce(() => updateStyle(), 10);
    const tabs = BuildCategoryTabsInformation(props);
    return <Tabs tabs={tabs} />;
};

export default withRouter(withStyle(CategoryTabs, 'category_tabs'));
