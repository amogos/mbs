import React from 'react';
import { Tabs as AntTabs } from 'antd';

export interface TabData {
    id: number;
    title: string;
    callback: (id: number) => void;
}

interface Props {
    tabs: TabData[];
}

const Tabs = (props: Props) => {
    const { TabPane } = AntTabs;

    const onTabClicked = (key: string) => {
        const tabItem = props.tabs.find(item => item.id.toString() === key);
        if (!tabItem) return;
        tabItem.callback(tabItem.id);
    };

    return (
        <AntTabs defaultActiveKey="-1" tabPosition={'top'} type={'line'} onTabClick={onTabClicked}>
            {props.tabs.map(item => (
                <TabPane key={`${item.id}`} style={{ padding: 0, border: 0 }} tab={item.title.toUpperCase()}></TabPane>
            ))}
        </AntTabs>
    );
};

export default Tabs;
