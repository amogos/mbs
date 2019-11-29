import axios from 'axios';
import * as DataTypes from '../../shared/types';
import { urlLanguages } from './constants';

export async function getLanguages(onError: (resultCode: number) => void): Promise<DataTypes.LanguageRecordType[]> {
    let languagesArray: DataTypes.LanguageRecordType[] = [];
    await axios
        .get(urlLanguages)
        .then(response => {
            response.data.forEach((item: DataTypes.LanguageRecordType) => {
                languagesArray.push(item);
            });
        })
        .catch(error => {
            onError(error);
        });
    return languagesArray;
}

export async function getLanguageRecordTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.LanguageRecordType> {
    let language = DataTypes.NullLanguage();
    await axios
        .get(`${urlLanguages}/${id}`)
        .then(response => {
            language = response.data;
        })
        .catch(error => onError(error));
    return language;
}

export async function getLanguageRecordTypeFromTitle(
    title: string,
    onError: (resultCode: number) => void,
): Promise<DataTypes.LanguageRecordType> {
    let language = DataTypes.NullLanguage();
    await axios
        .get(`${urlLanguages}?title=${title}`)
        .then(response => {
            if (response.data.length > 0) language = response.data[0];
        })
        .catch(error => onError(error));
    return language;
}

export async function addLanguage(
    title: string,
    onError: (resultCode: number) => void,
): Promise<DataTypes.LanguageRecordType> {
    let language = await getLanguageRecordTypeFromTitle(title, onError);
    if (language.id <= 0) {
        await axios
            .post(urlLanguages, {
                title: title,
            })
            .then(result => (language = result.data))
            .catch(error => onError(error));
    }

    return language;
}
