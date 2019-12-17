import React from 'react';
import { Card, Col, Row, Divider } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux } from './../hooks/hooks';

interface Props {
    categories: DataTypes.CategoryRecordType[];
}

const CategorySettingsComponent = (props: Props) => {
    const { categories } = props;

    const CategoryContent = (category: DataTypes.CategoryRecordType) => {
        return <p>{`Titles: ${category.count}`}</p>;
    };

    const Columns = (i: number): any[] => {
        const result: any[] = [];
        for (let j = i; j < props.categories.length && j < i + 3; j++) {
            const category = props.categories[j];
            result.push(
                <Col span={8}>
                    <Card title={category.title} bordered={false}>
                        {CategoryContent(category)}
                    </Card>
                </Col>,
            );
        }
        return result;
    };

    const rows: any[] = [];

    for (let i = 0; i < categories.length; i += 3) {
        rows.push(
            <div style={{ padding: '10px' }}>
                <Row gutter={16}>{Columns(i)}</Row>
            </div>,
        );
    }

    return (
        <Aux>
            <h2>Category Settings</h2>
            <Divider />
            <div style={{ background: '#ECECEC', padding: '30px' }}>{rows}</div>
        </Aux>
    );
};

export default CategorySettingsComponent;
