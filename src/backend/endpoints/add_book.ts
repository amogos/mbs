import axios from 'axios';
import { urlBooks } from './constants';
import * as DataTypes from '../../types';

export async function addBook(value: DataTypes.BookValueType, onError: (resultCode: number) => void) {
    await axios
        .post(urlBooks, {
            author: value.author,
            image: value.image,
            language: value.language.id,
            owner: value.owner.id,
            holder: -1,
            title: value.title,
            state: 'state.book.idle',
            category: value.category.id,
        })
        .catch(error => onError(error));
}
