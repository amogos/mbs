import React from 'react'
import { Text, StyleSheet, Button } from 'react-native'
import EventBus from './../utils/event_bus'
import Strings from './../constants/string_constant'
import * as Types from "./../types";

interface Props {
    id: string | null;
    value: Types.BookValueType;
    userdata: Types.UserType;
}
interface State {

}

export default class BookPlacement extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.onAssignButtonPressed = this.onAssignButtonPressed.bind(this);
        this.onReturnButtonPressed = this.onReturnButtonPressed.bind(this);
    }

    returnable() {
        const { userdata, value } = this.props;
        return (value.owner.email !== value.holder.email && userdata.email === value.holder.email)
    }

    assignable() {
        const { userdata, value } = this.props;
        return userdata.email !== value.owner.email && (value.holder.email === "" || value.holder.email === value.owner.email);
    }

    render() {
        let content;
        const { holder, owner } = this.props.value;
        if (this.assignable()) {
            content = (<Text style={styles.description}> <br /> {Strings.book_placement_component.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
                <br /><Button title={Strings.book_placement_component.MYBOOKSHELVE_STRING_ASSIGN} color="#000000ff"
                    onPress={this.onAssignButtonPressed} />
            </Text>);

        } else if (this.returnable()) {
            content = (<Text style={styles.description}> <br /> {Strings.book_placement_component.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
                <br /><Button title={Strings.book_placement_component.MYBOOKSHELVE_STRING_RETURN} color="#33FF8A" onPress={this.onReturnButtonPressed} />
            </Text>);
        } else {
            content = (<Text style={styles.description}> <br /> {Strings.book_placement_component.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
                <br /><Button title={holder.email === "" ?
                    owner.name : holder.name} color="#808080" onPress={() => { }} />
            </Text>);
        }
        return (
            content
        );
    }

    onAssignButtonPressed() {
        EventBus.getInstance().fireEvent("onBookAsigned", { id: this.props.id } as Types.BookKeyType);
    }

    onReturnButtonPressed() {
        EventBus.getInstance().fireEvent("onBookReturned", { id: this.props.id } as Types.BookKeyType);
    }
}

const styles = StyleSheet.create({
    button:
    {
        flex: 2,
    },
    description:
    {
        fontSize: 14,
        color: 'gray',
        fontWeight: 'normal',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});