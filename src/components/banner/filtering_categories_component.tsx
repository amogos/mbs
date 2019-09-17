import React from 'react';
import * as DataTypes from '../../types';
import { Select } from 'antd';

const { Option } = Select;

interface Props {
    categories: DataTypes.CategoryRecordType[];
    tabFilters: string[];
    onFiltersChanged(filter: string[]): void;
    categoryFilters: string[];
    visible:boolean;
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

    if (props.categories && props.visible)
        return (
            <Select
                mode="multiple"
                style={{ width: '60%' }}
                placeholder="Filter by category"
                onChange={handleMultiFilterChange}
                allowClear={true}
            >
                {CategoryItems(props)}
            </Select>
        );

    return null;
};

export default FilteringCategoriesComponent;
