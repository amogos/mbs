import React, { useState } from 'react';
import * as DataTypes from '../../../shared/types';
import SpaceImage from './space_image';
import SpaceActions from './space_actions';
import SpaceDescription from './space_description';
import SpaceStatistics from './space_statistics';
import { Aux, withStyle } from './../hooks/hooks';
import AddNewBookComponent from '../add_new_book/add_new_book';

interface Props {
    //  injected data
    userdata: DataTypes.UserRecordType;
    languages: DataTypes.LanguageRecordType[];
    categories: DataTypes.CategoryRecordType[];
    addBook(book: DataTypes.BookValueType, onSuccess: () => void): void;
    getBookDescription(
        isbn10: string,
        isbn13: string,
        callback: (result: DataTypes.BookDescriptionRecordType) => void,
    ): void;

    //  extra data
    item: DataTypes.SpaceType;
    onSpaceClicked: (space: DataTypes.SpaceType) => void;
    onSubscribeButtonClicked: (space: DataTypes.SpaceType) => void;
    onAddBookButtonClicked: (space: DataTypes.SpaceType) => void;
    onEditSpaceButtonClicked: (space: DataTypes.SpaceType) => void;
}

const SpaceHolder = (props: Props) => {
    const subscribed = props.userdata.subscriptions.includes(props.item.id);
    const { onSpaceClicked, onSubscribeButtonClicked, onEditSpaceButtonClicked, item, userdata } = props;
    const icons = {
        subscribe: subscribed ? { icon: 'lock', tooltip: 'unsubscribe' } : { icon: 'unlock', tooltip: 'subscribe' },
        add: { icon: 'plus', tooltip: 'add book' },
        edit: { icon: 'edit', tooltip: 'edit space' },
    };

    const [visible, setVisible] = useState(false);

    const subscribe = () => onSubscribeButtonClicked(item);
    const add = () => setVisible(true);
    const edit = () => onEditSpaceButtonClicked(item);

    const actions = {
        subscribe: subscribe,
        add: add,
        edit: edit,
    };

    const AddNewBookPopup = () => {
        if (!visible) return null;
        return (
            <AddNewBookComponent
                {...props}
                spaceId={props.item.id}
                visible={visible}
                callback={() => setVisible(false)}
            />
        );
    };

    const owner = item.owner.id === userdata.id;
    const actionProps = { ...props, actions, icons, owner };

    return (
        <Aux>
            <div onClick={() => onSpaceClicked(item)}>
                <SpaceDescription {...props} />
                <SpaceStatistics {...props} />
            </div>
            <SpaceActions {...actionProps} />
            <SpaceImage {...props} />
            <AddNewBookPopup />
        </Aux>
    );
};

export default withStyle(SpaceHolder, 'space_holder');
