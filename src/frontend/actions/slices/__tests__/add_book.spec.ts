import * as ActionTypes from './../../../../shared/constants/action_constant';
import { pageAction } from '../..';
import * as DataTypes from '../../../../shared/types';

const { PageActionConstant: TreeActionConstant } = ActionTypes.default;

const bookValue: DataTypes.BookValueType = {
    author: 'Eric Carle',
    state: 'state.book.idle',
    isbn:"",
    image: 'https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg',
    language: DataTypes.NullLanguage,
    owner: {
        email: 'daosmistique@yahoo.com',
        name: 'Iulia Mogos',
        picture: '',
        id: 1,
    },
    holder: DataTypes.NullUser,
    title: "The Very Hungry Caterpillar's ABC",
    category: DataTypes.NullCategory,
};

describe('addBook', () => {
    it('should build action for adding a book', () => {
        const expectedAction = {
            type: TreeActionConstant.ACTION_ADD_BOOK,
            data: bookValue,
        };
        expect(pageAction.addBook(bookValue)).toEqual(expectedAction);
    });
});
