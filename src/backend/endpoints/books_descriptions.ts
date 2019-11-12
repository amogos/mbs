import axios from 'axios';
import { urlBooksDescriptions } from './constants';
import * as DataTypes from '../../shared/types';

export async function getBookDescriptionForISBN(
    isbn10: string,
    isbn13: string,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookDescriptionRecordType> {
    let result: DataTypes.BookDescriptionRecordType = DataTypes.NullBookDescriptionRecordType;
    const condition = isbn10.length === 10 ? `isbn10=${isbn10}` : `isbn13=${isbn13}`;
    const url = `${urlBooksDescriptions}?${condition}`;

    await axios
        .get(url)
        .then(response => {
            if (response.data.length > 0) result = response.data[0];
        })
        .catch(error => onError(error));

    return result;
}

export async function addBookDescription(
    description: DataTypes.BookDescriptionValueType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookDescriptionRecordType> {
    let newRecord: DataTypes.BookDescriptionRecordType = DataTypes.NullBookDescriptionRecordType;
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
    let newRecord: DataTypes.BookDescriptionRecordType = DataTypes.NullBookDescriptionRecordType;
    await axios
        .put(`${urlBooksDescriptions}/${id}`, description)
        .then(result => (newRecord = result.data))
        .catch(error => onError(error));
    return newRecord;
}
