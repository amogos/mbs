import * as ActionTypes from '../../constants/action_constant';
import * as Actions from '../index';
import * as DataTypes from '../../types';

const bookValue: DataTypes.BookValueType = {
    author: 'Eric Carle',
    state: 'state.book.idle',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg',
    language: DataTypes.nullLanguage,
    owner: {
        value: { email: 'daosmistique@yahoo.com', name: 'Iulia Mogos' } as DataTypes.UserValueType,
        id: 1,
    },
    holder: DataTypes.nullUser,
    title: "The Very Hungry Caterpillar's ABC",
};

describe('addBook', () => {
    it('should build action for adding a book', () => {
        const expectedAction = {
            type: ActionTypes.ACTION_ADD_BOOK,
            data: bookValue,
        };
        expect(Actions.addBook(bookValue)).toEqual(expectedAction);
    });
});
