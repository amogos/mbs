import React from 'react';
import { Button } from 'antd';
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
    return (
        <AntTabs defaultActiveKey="-1" tabPosition={'top'} type={'line'}>
            {props.tabs.map(item => (
                <TabPane
                    key={`${item.id}`}
                    style={{ padding: 0, border: 0 }}
                    tab={
                        <Button type="link" style={{ color: 'gray' }} onClick={() => item.callback(item.id)}>
                            {item.title.toUpperCase()}
                        </Button>
                    }
                ></TabPane>
            ))}
        </AntTabs>
    );
};

export default Tabs;
