import React from 'react';
import * as DataTypes from '../../types';
import { Select } from 'antd';

const { Option } = Select;

interface Props {
    categories: DataTypes.CategoryRecordType[];
    filters: string[];
    onFiltersChanged(filter: string[]): void;
}

const CategoryItems = (props: Props) => {
    const children: any[] = [];
    props.categories.forEach(category => children.push(<Option key={category.id}>{category.title}</Option>));
    return children;
};

const FilteringCategoriesComponent = (props: Props) => {
    function handleMultiFilterChange(value: string[]) {
        let filters: string[] = [];

        value.forEach(category => {
            filters = [...filters, 'category=' + category];
        });

        if (props.onFiltersChanged) props.onFiltersChanged(filters);
    }

    if (props.categories)
        return (
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Filter by category"
                onChange={handleMultiFilterChange}
            >
                {CategoryItems(props)}
            </Select>
        );

    return null;
};

export default FilteringCategoriesComponent;
