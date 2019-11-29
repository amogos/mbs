import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlCategory } from './constants';

export async function getCategories(onError: (resultCode: number) => void): Promise<DataTypes.CategoryRecordType[]> {
    const categoryArray: DataTypes.CategoryRecordType[] = [];
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
    let category = DataTypes.NullCategoryRecordType();
    await axios
        .get(`${urlCategory}/${id}`)
        .then(response => {
            category = { id: response.data.id, title: response.data.title };
        })
        .catch(error => onError(error));
    return category;
}

export async function getCategoryRecordTypeFromTitle(
    title: string,
    onError: (resultCode: number) => void,
): Promise<DataTypes.CategoryRecordType> {
    let category = DataTypes.NullCategoryRecordType();
    await axios
        .get(`${urlCategory}?title=${title}`)
        .then(response => {
            if (response.data.length > 0) category = response.data[0];
        })
        .catch(error => onError(error));
    return category;
}

export async function addCategory(
    title: string,
    onError: (resultCode: number) => void,
): Promise<DataTypes.CategoryRecordType> {
    let category = await getCategoryRecordTypeFromTitle(title, onError);
    if (category.id <= 0) {
        await axios
            .post(urlCategory, {
                title: title,
            })
            .then(result => {
                category = result.data;
            })
            .catch(error => onError(error));
    }
    return category;
}
