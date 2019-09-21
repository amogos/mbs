import axios from 'axios';
import * as DataTypes from '../../types';
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
    let language = DataTypes.NullLanguage;
    await axios
        .get(`${urlLanguages}/${id}`)
        .then(response => {
            language = response.data;
        })
        .catch(error => onError(error));
    return language;
}
