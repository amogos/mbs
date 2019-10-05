import React from 'react';
import Tabs, { TabData } from '../banner/tabs';
import * as DataTypes from '../../../shared/types';
import * as Strings from '../../../shared/constants/string_constant';
import { withStyle } from '../aux_component';

interface Props {
    gotoSpaces(): void;
    gotoListBooks(filters: string[]): void;
    categories: DataTypes.CategoryRecordType[];
}

const BuildCategoryTabsInformation = (props: Props) => {
    let categoryTabsContent: TabData[] = [];
    const { CategoryTabsStrings } = Strings.default;

    if (!props.categories) return categoryTabsContent;

    categoryTabsContent.push({ id: -1, title: CategoryTabsStrings.HOME, callback: () => props.gotoSpaces() });

    categoryTabsContent = categoryTabsContent.concat(
        props.categories.slice(1, 11).map(item => {
            const tab: TabData = {
                id: item.id,
                title: item.title,
                callback: () => props.gotoListBooks([`category=${item.id}`]),
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

export default withStyle(CategoryTabs, 'category_tabs');
