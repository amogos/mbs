import axios from 'axios';
import * as DataTypes from '../../types';
import { urlFormats } from './constants';

export async function getFormats(onError: (resultCode: number) => void): Promise<DataTypes.FormatRawType[]> {
    let formatArray: DataTypes.FormatRawType[] = [];
    await axios
        .get(urlFormats)
        .then(response => {
            formatArray.push(response.data);
        })
        .catch(error => onError(error));
    return formatArray;
}

export async function getFormatRecordTypeFromId(
    id: number,
    onError: (resultCode: number) => void,
): Promise<DataTypes.FormatRawType> {
    let format: DataTypes.FormatRawType = DataTypes.NullFormat;
    await axios
        .get(`${urlFormats}?id=${id}`)
        .then(response => {
            format = response.data[0];
        })
        .catch(error => onError(error));
    return format;
}
