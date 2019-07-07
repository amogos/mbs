import React from 'react';
import renderer from 'react-test-renderer';
import BookComponent from '../book_component';
import * as DataTypes from '../../types';

jest.mock('./../../containers/book_remover_container', () => 'remover container');
jest.mock('./../../containers/book_placement_container', () => 'placement container');

test('Check correct rendering', () => {
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

    const component = renderer.create(
        <BookComponent id={bookKey} value={bookValue} userdata={userdata} extradata={bookKey} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
