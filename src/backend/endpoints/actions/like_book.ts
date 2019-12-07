import { getBookDescriptionForISBN, updateBookDescription } from './../books_descriptions';
import * as DataTypes from '../../../shared/types';

export async function likeBook(book: DataTypes.BookRecordType, onError: (resultCode: number) => void): Promise<void> {
    const description = await getBookDescriptionForISBN(book.isbn10, book.isbn13, onError);
    description.likes++;
    await updateBookDescription(description.id, description, onError);
}
