import React from 'react';
import renderer from 'react-test-renderer';
import * as DataTypes from '../../types';
import BookRemoverComponent from './../book_remover_component';

describe('Should render correctly in both cases of ownership', () => {
    test('I am the owner so I should see the delete button', () => {
        const userdata: DataTypes.UserType = { name: 'Iulia Mogos', email: 'daosmistique@yahoo.com' };
        const bookValue: DataTypes.BookValueType = {
            author: 'Eric Carle',
            state: 'state.book.idle',
            pending: [],
            image: 'https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg',
            language: 'English',
            owner: {
                email: 'daosmistique@yahoo.com',
                name: 'Iulia Mogos',
            },
            title: "The Very Hungry Caterpillar's ABC",
        };
        const bookKey = 'Lb2fXy3Z6edp87fkoSg';
        const props = {
            id: bookKey,
            userdata: userdata,
            value: bookValue,
            deleteBook: jest.fn(),
        };
        const component = renderer.create(<BookRemoverComponent {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('I am not the owner I should not see the delete button ', () => {
        const userdata: DataTypes.UserType = { name: 'PixyDixi', email: 'pixydixy@yahoo.com' };
        const bookValue: DataTypes.BookValueType = {
            author: 'Eric Carle',
            state: 'state.book.idle',
            pending: [],
            image: 'https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg',
            language: 'English',
            owner: {
                email: 'daosmistique@yahoo.com',
                name: 'Iulia Mogos',
            },
            title: "The Very Hungry Caterpillar's ABC",
        };
        const bookKey = 'Lb2fXy3Z6edp87fkoSg';
        const props = {
            id: bookKey,
            userdata: userdata,
            value: bookValue,
            deleteBook: jest.fn(),
        };
        const component = renderer.create(<BookRemoverComponent {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
