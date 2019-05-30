import React from 'react';
import BookPlacementContainer from './../containers/book_placement_container';
import BookRemoverContainer from './../containers/book_remover_container';
import * as Types from './../types';

interface Props {
    id: string | null;
    value: Types.BookValueType;
    userdata: Types.UserType;
    extradata: string;
}

function BookLeftSide(props: Props) {
    return (
        <td>
            <img src={props.value.image} alt="new" width={64} height={64} />
            <BookRemoverContainer {...props} />
        </td>
    );
}

function BookRightSide(props: Props) {
    return (
        <td>
            <div>
                <p> {props.value.title} </p>
                <p> ({props.value.language}) </p>
                <p> {props.value.author} </p>
            </div>
            <BookPlacementContainer {...props} />
        </td>
    );
}

export default class Book extends React.Component<Props, {}> {
    public componentWillReceiveProps(props: Props) {
        if (props.extradata === this.props.extradata) {
            this.setState(this.state);
        }
    }

    public render() {
        return (
            <tr>
                <BookLeftSide {...this.props} />
                <BookRightSide {...this.props} />
            </tr>
        );
    }
}
