import axios from 'axios';
import { urlUsers } from '../constants';
import * as DataTypes from '../../../shared/types';

export async function bookmarkBook(
    user: DataTypes.UserRecordType,
    bookId: number,
    onSuccess: () => void,
    onError: (resultCode: number) => void,
) {
    const bookmarks = new Set([...user.bookmarks, bookId]);
    const userRecordUpdate = { ...user, bookmarks: Array.from(bookmarks) };

    await axios
        .put(`${urlUsers}/${user.id}`, userRecordUpdate)
        .then(() => {
            user.bookmarks = userRecordUpdate.bookmarks;
            onSuccess();
        })
        .catch(error => onError(error));
}

export async function unbookmarkBook(
    user: DataTypes.UserRecordType,
    bookId: number,
    onSuccess: () => void,
    onError: (resultCode: number) => void,
) {
    const newBookmarks = user.bookmarks.filter(entry => entry !== bookId);
    const userRecordUpdate = { ...user, following: Array.from(newBookmarks) };

    await axios
        .put(`${urlUsers}/${user.id}`, userRecordUpdate)
        .then(() => {
            user.bookmarks = userRecordUpdate.bookmarks;
            onSuccess();
        })
        .catch(error => onError(error));
}
