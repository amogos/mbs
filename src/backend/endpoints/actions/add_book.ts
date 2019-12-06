import axios from 'axios';
import { urlBooks } from '../constants';
import { addCategory } from './../../endpoints/categories';
import { addLanguage } from './../../endpoints/languages';
import {
    addBookDescription,
    getBookDescriptionForISBN,
    updateBookDescription,
} from './../../endpoints/books_descriptions';
import * as DataTypes from '../../../shared/types';
import { addFeed } from './../user_feed';

export async function addBook(
    value: DataTypes.BookValueType,
    onSuccess: () => void,
    onError: (resultCode: number) => void,
) {
    if (value.category.id <= 0) {
        const newCategory = await addCategory(value.category.title, onError);
        value.category.id = newCategory.id;
    }

    if (value.language.id <= 0) {
        const newLanguage = await addLanguage(value.language.title, onError);
        value.language.id = newLanguage.id;
    }

    const bookRecord: DataTypes.BookRawValueType = {
        owner: value.owner.id,
        holder: -1,
        state: 'state.book.idle',
        isbn10: value.isbn10,
        isbn13: value.isbn13,
        space: value.space,
        category: value.category.id,
    };

    const newBookDescription: DataTypes.BookDescriptionValueType = {
        title: value.title,
        subtitle: value.subtitle,
        language: value.language,
        isbn10: value.isbn10,
        isbn13: value.isbn13,
        format: value.format,
        category: [value.category],
        author: value.author,
        length: value.length,
        image: value.image,
        description: value.description,
        likes: 0,
    };

    //  add new book
    let newRecord = DataTypes.NullRawBookRecordType();
    await axios
        .post(urlBooks, bookRecord)
        .then(result => {
            newRecord = result.data;
            onSuccess();
        })
        .catch(error => onError(error));

    //  merge/update description
    const previousDescription = await getBookDescriptionForISBN(value.isbn10, value.isbn13, onError);
    if (previousDescription.id === 0) {
        await addBookDescription(newBookDescription, onError);
    } else {
        if (previousDescription !== newBookDescription) {
            newBookDescription.likes = previousDescription.likes;
            await updateBookDescription(previousDescription.id, newBookDescription, onError);
        }
    }

    //  add user feed
    const userFeed = DataTypes.NullUserFeedValueType();
    userFeed.type = DataTypes.UserFeedType.ADDED_BOOK;
    userFeed.book = newRecord.id;
    await addFeed(userFeed, onError);
}
