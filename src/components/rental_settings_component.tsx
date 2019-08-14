import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import * as StringConstants from '../constants/string_constant';

interface Props {
    visible: boolean;
    onDurationChanged(duration: number): void;
    onClosed(): void;
}

const RentalSettingsComponent = (props: Props) => {
    const [duration, setDuration] = useState(0);
    let days = Array.from(Array(120).keys());
    const { Option } = Select;

    return (
        <Modal
            title={StringConstants.default.MYBOOKSHELVE_RENTAL_SETTINGS}
            visible={props.visible}
            onOk={() => {
                if (duration == 0) return;
                props.onDurationChanged(duration);
                props.onClosed();
            }}
            onCancel={() => {
                props.onClosed();
            }}
        >
            <Select
                style={{ width: 200 }}
                placeholder={StringConstants.default.MYBOOKSHELVE_RENTAL_DURATION}
                onChange={(value: number) => {
                    setDuration(value);
                }}
            >
                {days.map(value => (
                    <Option key={value + 1}>{value + 1 + ' days'}</Option>
                ))}
            </Select>
        </Modal>
    );
};

export default RentalSettingsComponent;
