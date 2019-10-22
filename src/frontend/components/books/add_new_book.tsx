import React, { useState } from 'react';
import axios from 'axios';
import * as DataTypes from '../../../shared/types';
import * as BookStates from '../../../shared/constants/book_states_constant';
import * as StringConstant from '../../../shared/constants/string_constant';
import { Select, Input, message, Modal, Button } from 'antd';

const { Option } = Select;
const InputGroup = Input.Group;

interface Props {
    languages: DataTypes.LanguageRecordType[];
    categories: DataTypes.CategoryRecordType[];
    userdata: DataTypes.UserRecordType;
    addBook(book: DataTypes.BookValueType): void;
    spaceId: number;
    visible: boolean;
    callback: () => void;
}
const defaultImage =
    'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959';
let currentBook: DataTypes.BookValueType = {
    title: '',
    author: '',
    language: DataTypes.NullLanguage,
    image: defaultImage,
    owner: DataTypes.NullUser,
    state: BookStates.default.STATE_BOOK_IDLE,
    isbn: '',
    holder: DataTypes.NullUser,
    category: DataTypes.NullCategory,
    format: '1',
    space: 0,
};

//  https://www.googleapis.com/books/v1/volumes?q=isbn:9783314103483

const AddNewBookComponent = (props: Props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState(0);
    const [category, setCategory] = useState(0);
    const [isbn, setIsbn] = useState('');
    const [useGoogleApi, setUseGoogleApi] = useState(true);

    const onLanguageSelected = (value: number) => {
        const validLanguageSelection = value > 0 && value <= props.languages.length;
        if (!validLanguageSelection) return;
        setLanguage(value);
        currentBook.language = props.languages[value - 1];
    };

    const onCategorySelected = (value: number) => {
        const validCategorySelection = value > 0 && value <= props.categories.length;
        if (!validCategorySelection) return;
        setCategory(value);
        currentBook.category = props.categories[value - 1];
    };

    const fieldsValid = () => {
        return title !== '' && author !== '' && language !== 0 && category !== 0 && isbn !== '';
    };

    const clearFields = () => {
        setTitle('');
        setAuthor('');
        setIsbn('');
    };

    const onSaveButtonPressed = () => {
        if (!fieldsValid()) {
            message.error(StringConstant.default.MYBOOKSHELVE_INVALID_FIELDS);
            return;
        }
        props.addBook(currentBook);
        clearFields();
    };

    currentBook.owner = props.userdata;
    currentBook.space = props.spaceId;

    const SearchGoogleView = () => {
        async function fetchBook(
            isbn: string,
            onFailure: (error: any) => void,
            onSuccess: (response: any) => void,
        ): Promise<any> {
            let result = {};
            let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
            await axios
                .get(url)
                .then(response => {
                    result = response;
                    onSuccess(result);
                })
                .catch(error => onFailure(error));
            return result;
        }

        const onSuccess = (response: any) => {
            alert(JSON.stringify(response));
        };
        const onFailure = (error: any) => {};

        return (
            <InputGroup>
                <Input
                    placeholder="Isbn"
                    onChange={element => {
                        setIsbn(element.target.value);
                        currentBook.isbn = element.target.value;
                    }}
                    value={isbn}
                />
                <Button icon="search" onClick={() => fetchBook(isbn, onFailure, onSuccess)}>
                    Search
                </Button>
            </InputGroup>
        );
    };

    const FallbackView = () => {
        return (
            <InputGroup>
                <Input
                    placeholder="Title"
                    onChange={element => {
                        setTitle(element.target.value);
                        currentBook.title = element.target.value;
                    }}
                    value={title}
                />
                <Input
                    placeholder="Author"
                    onChange={element => {
                        setAuthor(element.target.value);
                        currentBook.author = element.target.value;
                    }}
                    value={author}
                />
                <Input
                    placeholder="Isbn"
                    onChange={element => {
                        setIsbn(element.target.value);
                        currentBook.isbn = element.target.value;
                    }}
                    value={isbn}
                />
                <Select
                    style={{ width: 200 }}
                    placeholder="Select language"
                    onChange={(value: number) => {
                        return onLanguageSelected(value);
                    }}
                >
                    {props.languages.map(language => (
                        <Option key={language.id}>{language.title}</Option>
                    ))}
                </Select>
                <Select
                    style={{ width: 200 }}
                    placeholder="Select category"
                    onChange={(value: number) => {
                        return onCategorySelected(value);
                    }}
                >
                    {props.categories.map(category => (
                        <Option key={category.id}>{category.title}</Option>
                    ))}
                </Select>
            </InputGroup>
        );
    };

    const ContentView = () => (useGoogleApi ? <SearchGoogleView /> : <FallbackView />);

    return (
        <Modal
            title={StringConstant.default.MYBOOKSHELVE_ADD_NEW_BOOK_TITLE}
            visible={props.visible}
            onOk={onSaveButtonPressed}
            onCancel={() => props.callback()}
        >
            <ContentView />
        </Modal>
    );
};

export default AddNewBookComponent;
