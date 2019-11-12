import React, { useState } from 'react';
import axios from 'axios';
import { useInput, useSelect } from './../hooks/hooks';
import { Select, Input, Modal, Button, message } from 'antd';
import * as DataTypes from '../../../shared/types';
import * as BookStates from '../../../shared/constants/book_states_constant';
import * as StringConstant from '../../../shared/constants/string_constant';
import BookPreview, { NullBookPreviewProps, BookPreviewProps } from './book_preview';

const { Option } = Select;
const InputGroup = Input.Group;

interface Props {
    languages: DataTypes.LanguageRecordType[];
    categories: DataTypes.CategoryRecordType[];
    userdata: DataTypes.UserRecordType;
    addBook(book: DataTypes.BookValueType, onSuccess: () => void): void;
    getBookDescription(
        isbn10: string,
        isbn13: string,
        callback: (result: DataTypes.BookDescriptionRecordType) => void,
    ): void;
    spaceId: number;
    visible: boolean;
    callback: () => void;
}
const defaultImage =
    'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959';

const EmptyBook = () => {
    return {
        title: '',
        subtitle: '',
        author: [],
        language: DataTypes.NullLanguage,
        image: defaultImage,
        owner: DataTypes.NullUser,
        state: BookStates.default.STATE_BOOK_IDLE,
        isbn: '',
        isbn10: '',
        isbn13: '',
        holder: DataTypes.NullUser,
        category: DataTypes.NullCategory,
        format: 1,
        space: 0,
        description: '',
        length: 0,
    };
};

let currentBook: DataTypes.BookValueType = EmptyBook();

const AddNewBookComponent = (props: Props) => {
    const [useVolumeInformation, setUseVolumeInformation] = useState(true);
    const [volumeInformation, setVolumeInformation] = useState(NullBookPreviewProps);

    currentBook.owner = props.userdata;
    currentBook.space = props.spaceId;

    const ReadVolumeInformation = (volumeInformation: BookPreviewProps) => {
        try {
            currentBook.title = volumeInformation.title;
            currentBook.subtitle = volumeInformation.subtitle;
            currentBook.author = volumeInformation.authors;
            currentBook.image = volumeInformation.imageLinks ? volumeInformation.imageLinks.thumbnail : defaultImage;
            currentBook.language.title = volumeInformation.language.toUpperCase();
            currentBook.category.title = volumeInformation.categories[0].toLowerCase();
            currentBook.description = volumeInformation.description;
            currentBook.length = parseInt(volumeInformation.pageCount);

            if (volumeInformation.industryIdentifiers) {
                currentBook.isbn10 = volumeInformation.industryIdentifiers[0].identifier;
                currentBook.isbn13 = volumeInformation.industryIdentifiers[1].identifier;
            }
        } catch (error) {}
    };

    const ValidFields = (): boolean => {
        const ValidIsbn = (): boolean => {
            let validIsbn = true;
            currentBook.isbn = currentBook.isbn.replace('/D/g', '');
            if (currentBook.isbn.length === 10) currentBook.isbn10 = currentBook.isbn;
            else if (currentBook.isbn.length === 13) currentBook.isbn13 = currentBook.isbn;
            else validIsbn = false;
            return validIsbn;
        };
        return (
            ValidIsbn() &&
            currentBook.title !== '' &&
            currentBook.author.length > 0 &&
            currentBook.category.title !== '' &&
            currentBook.language.title !== ''
        );
    };

    const onSaveButtonPressed = () => {
        if (useVolumeInformation) {
            ReadVolumeInformation(volumeInformation);
        }

        if (!ValidFields()) {
            message.error('Invalid fields');
            return;
        }

        props.addBook(currentBook, () => message.success('Book added successfully'));
    };

    const SearchVolumeView = () => {
        async function fetchBookFromGoogle(
            isbn: string,
            onGoogleResponseFail: (error: any) => void,
            onGoogleResponseSuccess: (response: any) => void,
        ): Promise<any> {
            let result = {};
            const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
            await axios
                .get(url)
                .then(response => {
                    result = response.data;
                    onGoogleResponseSuccess(result);
                })
                .catch(error => onGoogleResponseFail(error));
            return result;
        }

        function fetchBookFromRecord() {
            const isbn10 = currentBook.isbn.length === 10 ? currentBook.isbn : '';
            const isbn13 = currentBook.isbn.length === 13 ? currentBook.isbn : '';
            let bookDescription = DataTypes.NullBookDescriptionRecordType;

            props.getBookDescription(isbn10, isbn13, (result: DataTypes.BookDescriptionRecordType) => {
                bookDescription = result;
                if (bookDescription.id === 0) {
                    currentBook = EmptyBook();
                    setUseVolumeInformation(false);
                } else {
                    const volumeInformation: BookPreviewProps = {
                        visible: true,
                        imageLinks: { smallThumbnail: bookDescription.image, thumbnail: bookDescription.image },
                        title: bookDescription.title,
                        subtitle: bookDescription.subtitle,
                        authors: bookDescription.author,
                        description: bookDescription.description,
                        publisher: '',
                        publishedDate: '',
                        pageCount: bookDescription.length.toString(),
                        language: bookDescription.language.title,
                        categories:
                            bookDescription.category.length > 0
                                ? [bookDescription.category[0].title]
                                : ['nonfiction(general)'],
                        industryIdentifiers: [
                            { type: 'isbn10', identifier: isbn10 },
                            { type: 'isbn13', identifier: isbn13 },
                        ],
                    };
                    setVolumeInformation(volumeInformation);
                }
            });
        }

        const onGoogleResponseSuccess = (response: any) => {
            if (response.items && response.items.length > 0) {
                const volumeInfo = response.items[0].volumeInfo;
                if (!volumeInfo.publisher) volumeInfo.publisher = '';
                if (!volumeInfo.categories) volumeInfo.categories = ['nonfiction(general)'];
                setVolumeInformation({ ...volumeInfo, visible: true });
            } else {
                fetchBookFromRecord();
            }
        };

        const onGoogleResponseFail = (error: any) => {};

        return (
            <InputGroup>
                <Input {...useInput('isbn', (value: string) => (currentBook.isbn = value))} />
                <Button
                    icon="search"
                    onClick={() => fetchBookFromGoogle(currentBook.isbn, onGoogleResponseFail, onGoogleResponseSuccess)}
                >
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
                <Input {...useInput('pageCount', (value: string) => (currentBook.length = parseInt(value)))} />
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

    const ContentView = () => (useVolumeInformation ? <SearchVolumeView /> : <FallbackView />);

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
