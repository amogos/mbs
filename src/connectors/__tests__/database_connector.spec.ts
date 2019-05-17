import waitForExpect from 'wait-for-expect'
import databaseConnector, { booksArray } from './../firebase_connector'
import * as DataTypes from './../../types'

const callbacks = {
    one() {
    },
};
const userdata: DataTypes.UserType = { name: "Iulia Mogos", email: "daosmistique@yahoo.com" };
const bookValue: DataTypes.BookValueType = {
    "author": "Eric Carle",
    "holder": {
        "email": "",
        "name": ""
    },
    "image": "https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg",
    "language": "English",
    "owner": {
        "email": "dixiepixy@yahoo.com",
        "name": "DixiPixie"
    },
    "title": "The Very Hungry Lion"
};

describe('Running database flow', () => {
    it('Should querryBooks()', async () => {
        let spy = jest.spyOn(callbacks, 'one');
        databaseConnector.querryBooks(callbacks.one);
        await waitForExpect(() => {
            expect(spy).toBeCalled();
        });
    })
    it('Should addBook()', async () => {
        let spy = jest.spyOn(callbacks, 'one');
        databaseConnector.addBook(bookValue, callbacks.one);
        await waitForExpect(() => {
            expect(spy).toBeCalled();
            expect(booksArray[booksArray.length - 1].value.title).toEqual(bookValue.title);
        });
    })
    it('Should assignBook()', async () => {
        let spy = jest.spyOn(callbacks, 'one');
        databaseConnector.assignBook(booksArray.length - 1, userdata, callbacks.one);
        await waitForExpect(() => {
            expect(spy).toBeCalled();
            expect(booksArray[booksArray.length - 1].value.holder).toEqual(userdata);
        });
    })
    it('Should deleteBook()', async () => {
        let spy = jest.spyOn(callbacks, 'one');
        let lastBookKey = booksArray[booksArray.length - 1].id as string;
        databaseConnector.deleteBook(lastBookKey as string, callbacks.one);
        await waitForExpect(() => {
            expect(spy).toBeCalled(); booksArray.length
            let index = booksArray.findIndex(function (item: DataTypes.BookRecordType) {
                return item.id === lastBookKey;
            });
            expect(index).toEqual(-1);
        });
    })

})