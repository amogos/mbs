import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import * as StringConstants from './../constants/string_constant';

interface Props {
    onDurationChanged(duration: number): void;
}

const RentalDurationPicker = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const [duration, setDuration] = useState(14);
    let days = Array.from(Array(120).keys());
    const { Option } = Select;

    return (
        <Modal
            title={StringConstants.default.MYBOOKSHELVE_ADD_NEW_BOOK_TITLE}
            visible={visible}
            onOk={() => {
                props.onDurationChanged(duration);
                setVisible(false);
            }}
            onCancel={() => setVisible(false)}
        >
            <Select
                style={{ width: 200 }}
                placeholder="Select category"
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

export default RentalDurationPicker;
