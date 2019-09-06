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
