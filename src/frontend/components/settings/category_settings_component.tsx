import React from 'react';
import { Card, Col, Row } from 'antd';
import * as DataTypes from '../../../shared/types';

interface Props {
    categories: DataTypes.CategoryRecordType[];
}

const CategorySettingsComponent = (props: Props) => {
    const { categories } = props;
    const rows: any[] = [];

    const columns = (i: number): any[] => {
        const result: any[] = [];
        for (let j = i; j < props.categories.length && j < i + 3; j++) {
            const category = props.categories[j];
            result.push(
                <Col span={8}>
                    <Card title={category.title} bordered={false}>
                        Card content
                    </Card>
                </Col>,
            );
        }
        return result;
    };

    for (let i = 0; i < categories.length; i += 3) {
        rows.push(<Row gutter={16}>{columns(i)}</Row>);
    }

    return <div style={{ background: '#ECECEC', padding: '30px' }}>{rows}</div>;
};

export default CategorySettingsComponent;
