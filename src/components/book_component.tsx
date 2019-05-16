import React from 'react'
import BookPlacementContainer from './../containers/book_placement_container'
import BookRemoverContainer from './../containers/book_remover_container'
import * as Types from "./../types";

interface Props {
    id: string | null;
    value: Types.BookValueType;
    userdata: Types.UserType;
    extraData: string
}

interface State {
}

function BookLeftSide(props: Props) {
    return (
        <td>
            <img src={props.value.image} alt="new" width={64} height={64} />
            <BookRemoverContainer {...props} />
        </td>)

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

        </td>);
}

export default class Book extends React.Component<Props, State> {
    componentWillReceiveProps(props: Props) {
        if (props.extraData === this.props.extraData) {
            this.setState(this.state);
        }
    }

    render() {
        return (
            <tr>
                <BookLeftSide {...this.props} />
                <BookRightSide {...this.props} />
            </tr>
        );
    }
}

