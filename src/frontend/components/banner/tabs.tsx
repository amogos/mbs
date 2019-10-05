import React from 'react';
import { Button } from 'antd';
import Aux from '../aux_component';

export interface TabData {
    id: number;
    title: string;
    callback: (id: number) => void;
}

interface Props {
    tabs: TabData[];
}

const Tabs = (props: Props) => {
    return (
        <Aux>
            {props.tabs.map(item => (
                <Button onClick={() => item.callback(item.id)}>{item.title.toUpperCase()}</Button>
            ))}
        </Aux>
    );
};

export default Tabs;
