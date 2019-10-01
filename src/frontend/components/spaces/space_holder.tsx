import React, { useState } from 'react';
import * as DataTypes from '../../../shared/types';
import { Card } from 'antd';
import SpaceImage from './space_image';
import SpaceActions from './space_actions';
import SpaceDescription from './space_description';
import SpaceStatistics from './space_statistics';
import Aux from './../aux_component';
import AddNewBookComponent from './../../containers/add_new_book_container';

interface Props {
    item: DataTypes.SpaceType;
    userdata: DataTypes.UserRecordType;
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
    const [showAddBook, setShowAddBook] = useState(false);

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
    const OnAddBookButtonClicked = () => setShowAddBook(true);
    const OnEditSpaceButtonClicked = () => {};

    const actions = {
        follow: onFollowButtonClicked,
        subscribe: onSubscribeButtonClicked,
        add: OnAddBookButtonClicked,
        edit: OnEditSpaceButtonClicked,
    };

    const AddNewBookPopup = () => {
        if (!showAddBook) return null;
        return (
            <AddNewBookComponent spaceId={props.item.id} visible={showAddBook} callback={() => setShowAddBook(false)} />
        );
    };

    const owner = props.item.user.id === props.userdata.id;

    return (
        <Aux>
            <Card cover={SpaceImage(props)} actions={SpaceActions({ ...props, actions, icons, owner })}>
                <div onClick={props.onClick}>
                    <SpaceDescription {...props} />
                    <p />
                    <SpaceStatistics {...props} />
                </div>
            </Card>
            <AddNewBookPopup />
        </Aux>
    );
};

export default SpaceHolder;
