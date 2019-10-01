import React from 'react';
import { Button } from 'antd';
import { withStyle } from './../aux_component';

export interface CategoryTabInformation {
    id: number;
    title: string;
    callback: (id: number) => void;
}

interface Props {
    tabs: CategoryTabInformation[];
}

const CategoryTabs = (props: Props) => {
    return props.tabs.map(item => <Button onClick={() => item.callback(item.id)}>{item.title}</Button>);
};

export default withStyle(CategoryTabs, 'category_tabs');
