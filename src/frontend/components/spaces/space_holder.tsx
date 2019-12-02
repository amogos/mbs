import React, { useState } from 'react';
import * as DataTypes from '../../../shared/types';
import SpaceImage from './space_image';
import SpaceActions from './space_actions';
import SpaceDescription from './space_description';
import SpaceStatistics from './space_statistics';
import { Aux, withStyle } from './../hooks/hooks';
import AddNewBookComponent from '../books/book/add_new_book/add_new_book';

interface Props {
    item: DataTypes.SpaceType;
    userdata: DataTypes.UserRecordType;
    languages: DataTypes.LanguageRecordType[];
    categories: DataTypes.CategoryRecordType[];
    addBook(book: DataTypes.BookValueType, onSuccess: () => void): void;
    getBookDescription(
        isbn10: string,
        isbn13: string,
        callback: (result: DataTypes.BookDescriptionRecordType) => void,
    ): void;
    onClick: () => void;
    followSpace: (spaceId: number, callback: () => void) => void;
    unfollowSpace: (spaceId: number, callback: () => void) => void;
}

const SpaceHolder = (props: Props) => {
    const following = props.userdata.following.includes(props.item.id);

    const images = {
        follow: following ? { icon: 'eye-invisible', tooltip: 'stop following' } : { icon: 'eye', tooltip: 'follow' },
        subscribe: { icon: 'unlock', tooltip: 'subscribe' },
        add: { icon: 'plus', tooltip: 'add book' },
        edit: { icon: 'edit', tooltip: 'edit space' },
    };

    const [icons, setIcons] = useState(images);
    const [visible, setVisible] = useState(false);

    const onFollowButtonClicked = () => {
        if (following) {
            props.unfollowSpace(props.item.id, () => {
                setIcons({ ...images, follow: { icon: 'eye', tooltip: 'follow' } });
            });
        } else {
            props.followSpace(props.item.id, () => {
                setIcons({ ...images, follow: { icon: 'eye-invisible', tooltip: 'stop following' } });
            });
        }
    };

    const onSubscribeButtonClicked = () => {};
    const OnAddBookButtonClicked = () => setVisible(true);
    const OnEditSpaceButtonClicked = () => {};

    const actions = {
        follow: onFollowButtonClicked,
        subscribe: onSubscribeButtonClicked,
        add: OnAddBookButtonClicked,
        edit: OnEditSpaceButtonClicked,
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

    const owner = props.item.user.id === props.userdata.id;
    const actionProps = { ...props, actions, icons, owner };

    return (
        <Aux>
            <div onClick={props.onClick}>
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
