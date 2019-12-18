import React, { useState } from 'react';
import { Card, Col, Row, Divider, Button } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux } from './../hooks/hooks';

interface Props {
    categories: DataTypes.CategoryRecordType[];
    userdata: DataTypes.UserRecordType;
}

const CategoryButton = (props: { category: DataTypes.CategoryRecordType }) => {
    const [selected, setSelected] = useState(false);

    return (
        <Button shape="round" style={{ float: 'right' }}>
            +
        </Button>
    );
};

const CategorySettingsComponent = (props: Props) => {
    const { categories } = props;

    const CategoryContent = (category: DataTypes.CategoryRecordType) => {
        return <p>{`Titles: ${category.count}`}</p>;
    };

    const Columns = (i: number): JSX.Element[] => {
        const result: JSX.Element[] = [];
        for (let j = i; j < props.categories.length && j < i + 3; j++) {
            const category = props.categories[j];
            result.push(
                <Col span={8}>
                    <Card
                        title={
                            <div
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                }}
                            >
                                <span style={{ fontSize: '12px' }}>{category.title}</span>
                                <CategoryButton category={category} />
                            </div>
                        }
                        bordered={false}
                    >
                        {CategoryContent(category)}
                    </Card>
                </Col>,
            );
        }
        return result;
    };

    const rows: JSX.Element[] = [];

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
