import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import * as StringConstants from '../../../shared/constants/string_constant';

interface Props {
    visible: boolean;
    onDurationChanged(duration: number): void;
    onClosed(): void;
}

const RentalSettings = (props: Props) => {
    const [duration, setDuration] = useState(0);
    const days = Array.from(Array(120).keys());
    const { Option } = Select;

    return (
        <Modal
            title={StringConstants.default.MYBOOKSHELVE_RENTAL_SETTINGS}
            visible={props.visible}
            onOk={() => {
                if (duration === 0) return;
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
                {React.Children.toArray(days.map(value => <Option>{value + 1 + ' days'}</Option>))}
            </Select>
        </Modal>
    );
};

export default RentalSettings;
