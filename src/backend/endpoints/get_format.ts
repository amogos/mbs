import axios from 'axios';
import * as DataTypes from '../../types';
import { urlFormats } from './constants';

export async function getFormat(onError: (resultCode: number) => void): Promise<DataTypes.FormatRawType> {
    let format: DataTypes.FormatRawType = DataTypes.NullFormat;
    await axios
        .get(urlFormats)
        .then(response => {
            format = response.data;
        })
        .catch(error => onError(error));
    return format;
}
