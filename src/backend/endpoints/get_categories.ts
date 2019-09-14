import axios from 'axios';
import * as DataTypes from '../../types';
import { urlCategory } from './constants';

export async function getCategories(onError: (resultCode: number) => void): Promise<DataTypes.CategoryRecordType[]> {
    let categoryArray: DataTypes.CategoryRecordType[] = [];
    await axios
        .get(urlCategory)
        .then(response => {
            response.data.forEach((item: DataTypes.CategoryRecordType) => {
                categoryArray.push(item);
            });
        })
        .catch(error => {
            onError(error);
        });
    return categoryArray;
}

export async function getCategoryRecordTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.CategoryRecordType> {
    let category = DataTypes.NullCategory;
    await axios
        .get(`${urlCategory}/${id}`)
        .then(response => {
            category = { id: response.data.id, title: response.data.title };
        })
        .catch(error => onError(error));
    return category;
}
