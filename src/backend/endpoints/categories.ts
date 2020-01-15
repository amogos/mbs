import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlCategory } from './constants';
import { getBooks } from './books';

export async function getArrayCategories(
    categories: number[],
    onError: (resultCode: number) => void,
): Promise<DataTypes.CategoryRecordType[]> {
    let categoryArray: DataTypes.CategoryRecordType[] = [];

    if (categories.length === 0) return categoryArray;

    let url = `${urlCategory}?`;
    categories.forEach(id => (url = url + `id=${id}&`));

    await axios
        .get(url)
        .then(response => (categoryArray = response.data))
        .catch(error => {
            onError(error);
        });
    return categoryArray;
}

export async function getCategories(onError: (resultCode: number) => void): Promise<DataTypes.CategoryRecordType[]> {
    let categoryArray: DataTypes.CategoryRecordType[] = [];
    await axios
        .get(urlCategory)
        .then(response => {
            categoryArray = response.data;
        })
        .catch(error => {
            onError(error);
        });

    for (let i = 0; i < categoryArray.length; i++) {
        const categoryBooks = await getBooks([`category=${categoryArray[i].id}`], onError);
        categoryArray[i].count = categoryBooks.length;
    }
    return categoryArray;
}

export async function getCategoryRecordTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.CategoryRecordType> {
    let category = DataTypes.NullCategoryRecordType();
    await axios
        .get(`${urlCategory}/${id}`)
        .then(response => (category = response.data))
        .catch(error => onError(error));
    return category;
}

export async function getCategoryRecordTypeFromTitle(
    title: string,
    onError: (resultCode: number) => void,
): Promise<DataTypes.CategoryRecordType> {
    let category = DataTypes.NullCategoryRecordType();
    await axios
        .get(`${urlCategory}?title=${encodeURIComponent(title)}`)
        .then(response => {
            if (response.data.length > 0) category = response.data[0];
        })
        .catch(error => onError(error));
    return category;
}

export async function addCategory(
    value: DataTypes.CategoryRecordValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.CategoryRecordType> {
    let category = await getCategoryRecordTypeFromTitle(value.title, onError);
    const isNewCategory = category.id <= 0;

    if (isNewCategory) {
        await axios
            .post(urlCategory, value)
            .then(result => {
                category = result.data;
            })
            .catch(error => onError(error));
    }
    return category;
}
