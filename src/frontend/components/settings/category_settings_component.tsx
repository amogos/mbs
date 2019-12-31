import React, { useState } from 'react';
import { Card, Col, Row, Divider, Button, message } from 'antd';
import * as DataTypes from '../../../shared/types';
import { Aux } from './../hooks/hooks';

interface Props {
    categories: DataTypes.CategoryRecordType[];
    userdata: DataTypes.UserRecordType;
    updateUser(user: DataTypes.UserValueType): void;
}

const CategoryButton = (props: {
    category: DataTypes.CategoryRecordType;
    selections: Set<number>;
    setSelections: (sel: Set<number>) => void;
}) => {
    const [selected, setSelected] = useState(props.selections.has(props.category.id));
    const { category, selections, setSelections } = props;

    const OnButtonClicked = () => {
        const newSelectionState = !selected;

        if (newSelectionState) {
            selections.add(category.id);
            setSelected(true);
            message.success(`Category ${category.title} was added to your homepage`);
        } else {
            selections.delete(category.id);
            setSelected(false);
            message.success(`Category ${category.title} was removed from your homepage`);
        }
        setSelections(selections);
    };

    return (
        <Button shape="round" style={{ float: 'right' }} onClick={OnButtonClicked}>
            {selected ? '-' : '+'}
        </Button>
    );
};

const CategorySettingsComponent = (props: Props) => {
    const [selections, setSelections] = useState(new Set(props.userdata.categories));

    const { categories } = props;

    const CategoryContent = (category: DataTypes.CategoryRecordType) => {
        return <p>{`Titles: ${category.count}`}</p>;
    };

    const OnCategoriesSelectionStateChanged = (selections: Set<number>) => {
        const userdata = props.userdata;
        userdata.categories = Array.from(selections);
        props.updateUser(userdata);
        setSelections(selections);
    };

    const Columns = (i: number): JSX.Element[] => {
        const result: JSX.Element[] = [];
        for (let j = i; j < props.categories.length && j < i + 3; j++) {
            const category = props.categories[j];
            result.push(
                <Col key={j} span={8}>
                    <Card
                        title={
                            <div
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                }}
                            >
                                <span style={{ fontSize: '12px' }}>{category.title}</span>
                                <CategoryButton
                                    category={category}
                                    selections={selections}
                                    setSelections={OnCategoriesSelectionStateChanged}
                                />
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
