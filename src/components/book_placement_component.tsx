import React from 'react';
import { Text, Button } from 'react-native';
import Strings from './../constants/string_constant';
import * as DataTypes from './../types';
import * as BookStates from './../book_states';

interface Props {
    id: string | null;
    value: DataTypes.BookValueType;
    userdata: DataTypes.UserType;
    assignBook(key: string | null): void;
    returnBook(key: string | null): void;
}

const returnable = (props: Props) => {
    const { userdata, value } = props;
    if (value.state !== BookStates.default.STATE_BOOK_ASSIGNED) return false;
    return value.pending[0].email === userdata.email;
};

const assignable = (props: Props) => {
    const { userdata, value } = props;
    const stateAllowsAssignment: boolean =
        value.state === BookStates.default.STATE_BOOK_IDLE ||
        value.state === BookStates.default.STATE_BOOK_PENDING_ASSIGNMENT;
    const bookNotMine: boolean = userdata.email !== value.owner.email;
    let bookNotReserved = true;
    return stateAllowsAssignment && bookNotMine && bookNotReserved;
};
const BookPlacementComponent = (props: Props) => {
    let content;
    const { state, owner, pending } = props.value;
    const key = props.id;

    if (assignable(props)) {
        content = (
            <Text>
                {' '}
                <br /> {Strings.bookPlacementComponent.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
                <br />
                <Button
                    title={Strings.bookPlacementComponent.MYBOOKSHELVE_STRING_ASSIGN}
                    color="#000000ff"
                    onPress={() => props.assignBook(key)}
                />
            </Text>
        );
    } else if (returnable(props)) {
        content = (
            <Text>
                {' '}
                <br /> {Strings.bookPlacementComponent.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
                <br />
                <Button
                    title={Strings.bookPlacementComponent.MYBOOKSHELVE_STRING_RETURN}
                    color="#33FF8A"
                    onPress={() => props.returnBook(key)}
                />
            </Text>
        );
    } else {
        let title = owner.name;
        if (state === BookStates.default.STATE_BOOK_ASSIGNED) title = pending[0].name;
        else if (state === BookStates.default.STATE_BOOK_PENDING_ASSIGNMENT)
            title = Strings.MYBOOKSHELVE_PENDING_ASSIGNMENT;
        content = (
            <Text>
                {' '}
                <br /> {Strings.bookPlacementComponent.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
                <br />
                <Button title={title} color="#808080" onPress={() => {}} />
            </Text>
        );
    }
    return content;
};

export default BookPlacementComponent;
