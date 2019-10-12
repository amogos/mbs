import React from 'react';
import * as DataTypes from '../../../shared/types';
import SpaceHolder from './space_holder';
import Aux, { withStyle } from './../aux_component';

interface Props {
    spaces: DataTypes.Spaces;
    userdata: DataTypes.UserRecordType;
    languages: DataTypes.LanguageRecordType[];
    categories: DataTypes.CategoryRecordType[];
    addBook(book: DataTypes.BookValueType): void;
    getBooks(filters: string[]): void;
    followSpace: (spaceId: number, callback: () => void) => void;
    unfollowSpace: (spaceId: number, callback: () => void) => void;
}

const ListSpacesComponent = (props: Props) => {
    if (!props.spaces || !props.spaces.userSpaces || !props.spaces.otherSpaces) return null;

    const onSpaceClicked = (spaceId: number) => {
        let filters = [`space=${spaceId}`];
        props.getBooks(filters);
    };

    function onChange(slideNumber: number) {}

    return (
        <Aux>
            <p className="thicker">All Spaces</p>
            <p className="thicker">My Spaces</p>
            {props.spaces.userSpaces.map(item => (
                <SpaceHolder key={item.id} {...props} item={item} onClick={() => onSpaceClicked(item.id)} />
            ))}
            <p />
            <p className="thicker">Other Spaces</p>
            {props.spaces.otherSpaces.map(item => (
                <SpaceHolder key={item.id} {...props} item={item} onClick={() => onSpaceClicked(item.id)} />
            ))}
        </Aux>
    );
};

export default withStyle(ListSpacesComponent, 'list_spaces_component');
