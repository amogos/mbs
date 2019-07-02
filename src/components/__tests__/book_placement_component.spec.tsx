import React from 'react';
import renderer from 'react-test-renderer';
import * as DataTypes from '../../types';
import BookPlacementComponent from './../book_placement_component';

describe('Should render correctly in both cases of ownership', () => {
    test('I am the owner', () => {
        const userdata: DataTypes.UserType = { name: 'Iulia Mogos', email: 'daosmistique@yahoo.com' };
        const bookValue: DataTypes.BookValueType = {
            author: 'Eric Carle',
            state: 'state.book.idle',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg',
            language: 'English',
            owner: {
                email: 'daosmistique@yahoo.com',
                name: 'Iulia Mogos',
            },
            holder: DataTypes.nullUser,
            title: "The Very Hungry Caterpillar's ABC",
        };
        const bookKey = 'Lb2fXy3Z6edp87fkoSg';
        const props = {
            id: bookKey,
            userdata: userdata,
            value: bookValue,
            assignBook: jest.fn(),
            returnBook: jest.fn(),
        };
        const component = renderer.create(<BookPlacementComponent {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('I am not the owner', () => {
        const userdata: DataTypes.UserType = { name: 'PixyDixi', email: 'pixydixy@yahoo.com' };
        const bookValue: DataTypes.BookValueType = {
            author: 'Eric Carle',
            state: 'state.book.idle',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51lsugWtCvL._SY498_BO1,204,203,200_.jpg',
            language: 'English',
            owner: {
                email: 'daosmistique@yahoo.com',
                name: 'Iulia Mogos',
            },
            holder: DataTypes.nullUser,
            title: "The Very Hungry Caterpillar's ABC",
        };
        const bookKey = 'Lb2fXy3Z6edp87fkoSg';
        const props = {
            id: bookKey,
            userdata: userdata,
            value: bookValue,
            assignBook: jest.fn(),
            returnBook: jest.fn(),
        };
        const component = renderer.create(<BookPlacementComponent {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
