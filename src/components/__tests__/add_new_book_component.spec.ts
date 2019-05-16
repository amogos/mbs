import renderer from 'react-test-renderer';
import AddNewBookComponent from './../add_new_book_component'

test('Check form structure', () => {
    const addBook = jest.fn();
    const props = {
        userdata: { name: "mockuser", email: "mockusr@gmail.com" },
        addBook: addBook
    };
    const component = renderer.create(
        AddNewBookComponent(props)
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});