import * as DataTypes from '../types';
import * as BookStates from '../book_states';
import { Form, Select, Input, Button, List } from 'antd';

const { Option } = Select;

var defaultImage =
    'https://vignette.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959';
var currentBook = {
    title: '',
    author: '',
    language: DataTypes.nullLanguage,
    image: defaultImage,
    owner: DataTypes.nullUser,
    state: BookStates.default.STATE_BOOK_IDLE,
    holder: DataTypes.nullUser,
};

interface Props {
    languages: DataTypes.LanguageRecordType[];
    userdata: DataTypes.UserRecordType;
    addBook(book: DataTypes.BookValueType): void;
    form: any;
}

const onSaveButtonPressed = (props: Props) => {
    props.addBook(currentBook);
};

const onLanguageSelectionChanged = (value: string, props: Props) => {
    currentBook.language = props.languages.find(
        (entry: DataTypes.LanguageRecordType) => entry.language === value,
    ) as DataTypes.LanguageRecordType;
};

const AddNewBookComponent = (props: Props) => {
    currentBook.owner = props.userdata;
    const { getFieldDecorator } = props.form;

    return (
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={() => onSaveButtonPressed(props)}>
            <Form.Item label="Title">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input value!' }],
                })(<Input />)}
            </Form.Item>
            <Form.Item label="Author">
                {getFieldDecorator('author', {
                    rules: [{ required: true, message: 'Please input value!' }],
                })(<Input />)}
            </Form.Item>
            <Form.Item label="Language">
                {getFieldDecorator('language', {
                    rules: [{ required: true, message: 'Please select value!' }],
                })(
                    <Select
                        placeholder="Select lanuage"
                        onChange={value => onLanguageSelectionChanged(value as string, props)}
                    >
                        <List
                            dataSource={props.languages}
                            renderItem={item => <Option value={item.language}>{item.language}</Option>}
                        />
                    </Select>,
                )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddNewBookComponent;
