import axios from 'axios';
import { urlBooks } from '../constants';
import { addCategory } from './../../endpoints/categories';
import { addLanguage } from './../../endpoints/languages';
import { addDescriptionForISBN } from './../../endpoints/books_descriptions';
import * as DataTypes from '../../../shared/types';

export async function addBook(value: DataTypes.BookValueType, onError: (resultCode: number) => void) {
    if (value.category.id <= 0) {
        const newCategory = await addCategory(value.category.title, onError);
        value.category.id = newCategory.id;
    }

    if (value.language.id <= 0) {
        const newLanguage = await addLanguage(value.language.title, onError);
        value.language.id = newLanguage.id;
    }

    const bookDescription: DataTypes.BookDescriptionValueType = {
        title: value.title,
        subtitle: value.subtitle,
        language: value.language,
        isbn10: value.isbn10,
        isbn13: value.isbn13,
        format: value.format,
        category: value.category.id,
        author: value.author,
        length: value.length,
        image: value.image,
        description: value.description,
    };

    const bookRecord: DataTypes.BookRawValueType = {
        owner: value.owner.id,
        holder: -1,
        state: 'state.book.idle',
        isbn10: value.isbn10,
        isbn13: value.isbn13,
        space: value.space,
    };

    await axios.post(urlBooks, bookRecord).catch(error => onError(error));

    if (value.description !== '') await addDescriptionForISBN(bookDescription, onError);
}
