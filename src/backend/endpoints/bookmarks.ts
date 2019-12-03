import * as DataTypes from '../../shared/types';
import { getBookRecordTypeFromId } from './../endpoints/books';

export async function getBookmarks(
    user: DataTypes.UserRecordType,
    onError: (resultCode: number) => void,
): Promise<DataTypes.BookRecordType[]> {
    const result: DataTypes.BookRecordType[] = [];
    for (let i = 0; i < user.following.length; i++) {
        const bookId = user.following[i];
        const record = await getBookRecordTypeFromId(bookId, onError);
        result.push(record);
    }
    return result;
}
