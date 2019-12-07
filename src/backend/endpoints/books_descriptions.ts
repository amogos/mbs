import axios from 'axios';
import { urlBooksDescriptions } from './constants';
import * as DataTypes from '../../shared/types';

export async function getBookDescriptionForId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookDescriptionRecordType> {
    let result: DataTypes.BookDescriptionRecordType = DataTypes.NullBookDescriptionRecordType();
    const url = `${urlBooksDescriptions}/${id}`;
    await axios
        .get(url)
        .then(response => (result = response.data.length > 0 ? response.data[response.data.length - 1] : result))
        .catch(error => onError(error));

    return result;
}

export async function getBookDescriptionForISBN(
    isbn10: string,
    isbn13: string,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookDescriptionRecordType> {
    let result: DataTypes.BookDescriptionRecordType = DataTypes.NullBookDescriptionRecordType();
    const condition = isbn10.length === 10 ? `isbn10=${isbn10}` : `isbn13=${isbn13}`;
    const url = `${urlBooksDescriptions}?${condition}`;

    await axios
        .get(url)
        .then(response => (result = response.data.length > 0 ? response.data[response.data.length - 1] : result))
        .catch(error => onError(error));

    return result;
}

export async function addBookDescription(
    description: DataTypes.BookDescriptionValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookDescriptionRecordType> {
    let newRecord: DataTypes.BookDescriptionRecordType = DataTypes.NullBookDescriptionRecordType();
    await axios
        .post(urlBooksDescriptions, description)
        .then(result => (newRecord = result.data))
        .catch(error => onError(error));
    return newRecord;
}

export async function updateBookDescription(
    id: number,
    description: DataTypes.BookDescriptionValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookDescriptionRecordType> {
    let newRecord: DataTypes.BookDescriptionRecordType = DataTypes.NullBookDescriptionRecordType();
    await axios
        .put(`${urlBooksDescriptions}/${id}`, description)
        .then(result => (newRecord = result.data))
        .catch(error => onError(error));
    return newRecord;
}
