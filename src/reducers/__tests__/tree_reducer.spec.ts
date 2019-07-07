import treeReducer from './../tree_reducer';
import * as ActionTypes from './../../constants/action_constant';
import * as Actions from './../../actions/index';
import * as DataTypes from './../../types';
jest.mock('./../../connectors/database_instance');

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
const bookKey = 1;
const ownerId = 2;
const userdata = { value: { name: 'mockuser', email: 'mockusr@gmail.com' } as DataTypes.UserValueType, id: 1 };

var booksArray: DataTypes.BookRecordType[] = new Array<DataTypes.BookRecordType>();
booksArray.push({ id: bookKey, value: bookValue });

describe('Testing tree reducer branching', () => {
    it('Should return initial state if no action passed', () => {
        let initialState = {};
        expect(treeReducer(undefined, { type: ActionTypes.ACTION_NONE })).toEqual(initialState);
    });
    it('Should return goto add book state', () => {
        expect(treeReducer({}, Actions.gotoAddBook())).toEqual({ action: ActionTypes.ACTION_GOTO_ADD_BOOK });
    });
    it('Should return finalized addBook state', () => {
        expect(treeReducer({}, Actions.addBook(bookValue))).toEqual({ action: ActionTypes.ACTION_ADD_BOOK });
    });
    it('Should return goto list books state', () => {
        expect(treeReducer({}, Actions.gotoListBooks())).toEqual({ action: ActionTypes.ACTION_GOTO_LIST_BOOKS });
    });
    it('Should return list books state', () => {
        expect(treeReducer({}, Actions.listBooks())).toEqual({
            action: ActionTypes.ACTION_LIST_BOOKS,
            booksArray: booksArray,
        });
    });
    it('Should add userdata once connected', () => {
        expect(treeReducer({}, Actions.addUserData(userdata.value))).toEqual({ userdata: userdata });
    });
    it('Should return assign book to user state', () => {
        expect(treeReducer({}, Actions.askBook(bookKey, ownerId))).toEqual({
            action: ActionTypes.ACTION_ASK_BOOK,
            changingkey: bookKey,
        });
    });
    it('Should return book return state', () => {
        expect(treeReducer({}, Actions.returnBook(bookKey))).toEqual({
            action: ActionTypes.ACTION_RETURN_BOOK,
            changingkey: bookKey,
        });
    });
    it('Should return book deleted state', () => {
        expect(treeReducer({}, Actions.deleteBook(bookKey))).toEqual({
            action: ActionTypes.ACTION_DELETE_BOOK,
            changingkey: bookKey,
        });
    });
});
