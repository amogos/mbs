import axios from 'axios';
import { urlQueues } from '../constants';
import * as DataTypes from '../../../types';

export async function askBook(
    bookId: number,
    ownerId: number,
    user: DataTypes.UserRecordType,
    duration: number,
    onError: (resultCode: number) => void,
) {
    await axios
        .post(urlQueues, {
            userId: user.id,
            bookId: bookId,
            ownerId: ownerId,
            duration: duration,
        })
        .catch(error => onError(error));
}
