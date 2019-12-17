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
    userId: number,
    value: DataTypes.BookValueType,
    onSuccess: () => void,
    onError: (resultCode: number) => void,
) {
    //  when book is added from google books api it comes with its own category title so no id present
    if (value.category.id <= 0) {
        const categoryValue = DataTypes.NullCategoryRecordValueType();
        categoryValue.title = value.category.title;
        const newCategory = await addCategory(categoryValue, onError);
        value.category.id = newCategory.id;
    }

    //  when book is added from google books api it comes with its own language title so no id present
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

    //  merge/update existing book description or add new description if not present
    const previousDescription = await getBookDescriptionForISBN(value.isbn10, value.isbn13, onError);
    if (previousDescription.id === 0) {
        await addBookDescription(newBookDescription, onError);
    } else {
        if (previousDescription !== newBookDescription) {
            newBookDescription.likes = previousDescription.likes;
            await updateBookDescription(previousDescription.id, newBookDescription, onError);
        }
    }

    //  add added book event into user feed
    await addFeed(DataTypes.UserFeedBookEvent(userId, DataTypes.UserFeedType.ADDED_BOOK, newRecord.id), onError);
}
