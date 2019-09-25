import * as ActionTypes from './../../../../shared/constants/action_constant';
import { bookAction } from '../..';
import * as DataTypes from '../../../../shared/types';

const { BookActionConstant: TreeActionConstant } = ActionTypes.default;

const bookValue: DataTypes.BookValueType = {
    author: 'Eric Carle',
    state: 'state.book.idle',
    isbn: '',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg',
    language: DataTypes.NullLanguage,
    owner: {
        email: 'daosmistique@yahoo.com',
        name: 'Iulia Mogos',
        picture: '',
        id: 1,
        following: [],
    },
    holder: DataTypes.NullUser,
    title: "The Very Hungry Caterpillar's ABC",
    category: DataTypes.NullCategory,
    format: '1',
    space: 1,
};

describe('addBook', () => {
    it('should build action for adding a book', () => {
        const expectedAction = {
            type: TreeActionConstant.ACTION_ADD_BOOK,
            data: bookValue,
        };
        expect(bookAction.addBook(bookValue)).toEqual(expectedAction);
    });
});
