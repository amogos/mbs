import React from 'react';
import { Button } from 'antd';

export interface TabData {
    id: number;
    title: string;
    callback: (id: number) => void;
}

interface Props {
    tabs: TabData[];
}

const Tabs = (props: Props) => {
    return props.tabs.map(item => <Button onClick={() => item.callback(item.id)}>{item.title.toUpperCase()}</Button>);
};

export default Tabs;
