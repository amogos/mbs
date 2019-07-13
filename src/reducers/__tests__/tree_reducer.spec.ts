import treeReducer from './../tree_reducer';
import * as TreeActions from '../../actions/tree_actions';
import * as ActionTypes from '../../constants/action_constant';
import * as BookActions from '../../actions/book_actions';
import * as DataTypes from './../../types';
jest.mock('./../../connectors/database_instance');

const { BookActionConstant, TreeActionConstant } = ActionTypes.default;

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
        expect(treeReducer(undefined, { type: 'none' })).toEqual(initialState);
    });
    it('Should return goto add book state', () => {
        expect(treeReducer({}, TreeActions.gotoAddBook())).toEqual({ action: TreeActionConstant.ACTION_GOTO_ADD_BOOK });
    });
    it('Should return finalized addBook state', () => {
        expect(treeReducer({}, TreeActions.addBook(bookValue))).toEqual({ action: TreeActionConstant.ACTION_ADD_BOOK });
    });
    it('Should return goto list books state', () => {
        expect(treeReducer({}, TreeActions.gotoListBooks())).toEqual({
            action: TreeActionConstant.ACTION_GOTO_LIST_BOOKS,
        });
    });
    it('Should return list books state', () => {
        expect(treeReducer({}, TreeActions.listBooks())).toEqual({
            action: TreeActionConstant.ACTION_LIST_BOOKS,
            booksArray: booksArray,
        });
    });
    it('Should add userdata once connected', () => {
        // expect(treeReducer({}, Actions.addUserData(userdata.value))).toEqual({ userdata: userdata });
    });
    it('Should return assign book to user state', () => {
        expect(treeReducer({}, BookActions.askBook(bookKey, ownerId))).toEqual({
            action: BookActionConstant.ACTION_ASK_BOOK,
            changingkey: bookKey,
        });
    });
    it('Should return book return state', () => {
        expect(treeReducer({}, BookActions.returnBook(bookKey))).toEqual({
            action: BookActionConstant.ACTION_RETURN_BOOK,
            changingkey: bookKey,
        });
    });
    it('Should return book deleted state', () => {
        expect(treeReducer({}, BookActions.deleteBook(bookKey))).toEqual({
            action: BookActionConstant.ACTION_DELETE_BOOK,
            changingkey: bookKey,
        });
    });
});
