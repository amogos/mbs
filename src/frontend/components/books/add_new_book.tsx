import React, { useState } from 'react';
import axios from 'axios';
import { useInput, useSelect } from './../hooks/hooks';
import { Select, Input, Modal, Button, message } from 'antd';
import * as DataTypes from '../../../shared/types';
import * as BookStates from '../../../shared/constants/book_states_constant';
import * as StringConstant from '../../../shared/constants/string_constant';
import BookPreview, { NullBookPreviewProps } from './book_preview';

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
    author: [],
    language: DataTypes.NullLanguage,
    image: defaultImage,
    owner: DataTypes.NullUser,
    state: BookStates.default.STATE_BOOK_IDLE,
    isbn: '',
    holder: DataTypes.NullUser,
    category: DataTypes.NullCategory,
    format: '1',
    space: 0,
    description: '',
};

const AddNewBookComponent = (props: Props) => {
    const [useGoogleApi, setUseGoogleApi] = useState(true);
    const [volumeInformation, setVolumeInformation] = useState(NullBookPreviewProps);

    const onSaveButtonPressed = () => {
        if (useGoogleApi) {
            currentBook.title = volumeInformation.title;
            currentBook.author = volumeInformation.authors;
            currentBook.image = volumeInformation.imageLinks ? volumeInformation.imageLinks.thumbnail : defaultImage;
            currentBook.language.title = volumeInformation.language.toUpperCase();
            currentBook.category.title = volumeInformation.categories[0].toLowerCase();
            currentBook.description = volumeInformation.description;
        }

        const isValid: boolean =
            currentBook.isbn !== '' &&
            currentBook.title !== '' &&
            currentBook.author.length > 0 &&
            currentBook.category.title !== '' &&
            currentBook.language.title !== '';

        if (isValid) {
            props.addBook(currentBook);
            message.success('Book added successfully');
        } else {
            message.error('Invalid fields');
        }
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
                    result = response.data;
                    onSuccess(result);
                })
                .catch(error => onFailure(error));
            return result;
        }

        const onSuccess = (response: any) => {
            if (response.items && response.items.length > 0) {
                let volumeInfo = response.items[0].volumeInfo;
                if (!volumeInfo.publisher) volumeInfo.publisher = '';
                if (!volumeInfo.categories) volumeInfo.categories = ['nonfiction(general)'];
                setVolumeInformation({ ...volumeInfo, visible: true });
            } else {
                setUseGoogleApi(false);
            }
        };

        const onFailure = (error: any) => {};

        return (
            <InputGroup>
                <Input {...useInput('isbn', (value: string) => (currentBook.isbn = value))} />
                <Button icon="search" onClick={() => fetchBook(currentBook.isbn, onFailure, onSuccess)}>
                    Search
                </Button>
                <BookPreview {...volumeInformation} />
            </InputGroup>
        );
    };

    const FallbackView = () => {
        const onLanguageSelected = (value: string) => {
            const languageIndex = parseInt(value) - 1;
            const validLanguageSelection = languageIndex >= 0 && languageIndex < props.languages.length;
            if (!validLanguageSelection) return;
            currentBook.language = props.languages[languageIndex];
        };

        const onCategorySelected = (value: string) => {
            const categoryIndex = parseInt(value) - 1;
            const validCategorySelection = categoryIndex >= 0 && categoryIndex < props.categories.length;
            if (!validCategorySelection) return;
            currentBook.category = props.categories[categoryIndex];
        };

        return (
            <InputGroup>
                <Input {...useInput('title', (value: string) => (currentBook.title = value))} />
                <Input {...useInput('author', (value: string) => (currentBook.author = value.split(',')))} />
                <Input {...useInput('isbn', (value: string) => (currentBook.isbn = value))} />
                <Select
                    style={{ width: 200 }}
                    {...useSelect('Select language', (value: string) => onLanguageSelected(value))}
                >
                    {props.languages.map(language => (
                        <Option key={language.id}>{language.title}</Option>
                    ))}
                </Select>
                <Select
                    style={{ width: 200 }}
                    {...useSelect('Select category', (value: string) => onCategorySelected(value))}
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
