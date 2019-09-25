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
    followSpace: (spaceId: number) => void;
}

const SpaceHolder = (props: Props) => {
    const [showAddBook, setShowAddBook] = useState(false);
    const onFollowButtonClicked = () => props.followSpace(props.item.id);
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
            <Card
                className="space_holder"
                style={{ width: 300 }}
                cover={SpaceImage(props)}
                actions={SpaceActions({ ...props, actions, owner })}
            >
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
