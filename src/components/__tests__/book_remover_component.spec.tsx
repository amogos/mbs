import React from 'react';
import renderer from 'react-test-renderer';
import * as DataTypes from '../../types';
import BookRemoverComponent from './../book_remover_component';

describe('Should render correctly in both cases of ownership', () => {
    test('I am the owner so I should see the delete button', () => {
        const userdata: DataTypes.UserRecordType = {
            value: { name: 'Iulia Mogos', email: 'daosmistique@yahoo.com' } as DataTypes.UserValueType,
            id: 1,
        };
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
        const userdata: DataTypes.UserRecordType = {
            value: { name: 'PixyDixi', email: 'pixydixy@yahoo.com' } as DataTypes.UserValueType,
            id: 1,
        };
        const bookValue: DataTypes.BookValueType = {
            author: 'Eric Carle',
            state: 'state.book.idle',
            holder: DataTypes.nullUser,
            image: 'https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg',
            language: DataTypes.nullLanguage,
            owner: {
                value: { email: 'daosmistique@yahoo.com', name: 'Iulia Mogos' } as DataTypes.UserValueType,
                id: 1,
            },
            title: "The Very Hungry Caterpillar's ABC",
        };
        const bookKey = 1;
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
