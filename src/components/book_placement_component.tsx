import React from 'react'
import { Text, StyleSheet, Button } from 'react-native'
import Strings from './../constants/string_constant'
import * as Types from "./../types";


const returnable = (props: any) => {
    const { userdata, value } = props;
    return (value.owner.email !== value.holder.email && userdata.email === value.holder.email)
}

const assignable = (props: any) => {
    const { userdata, value } = props;
    return userdata.email !== value.owner.email && (value.holder.email === "" || value.holder.email === value.owner.email);
}

const BookPlacementComponent = (props: any) => {
    let content;
    const { holder, owner } = props.value;
    if (assignable(props)) {
        content = (<Text style={styles.description}> <br /> {Strings.book_placement_component.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
            <br /><Button title={Strings.book_placement_component.MYBOOKSHELVE_STRING_ASSIGN} color="#000000ff"
                onPress={() => props.assignBook(props.id)} />
        </Text>);

    } else if (returnable(props)) {
        content = (<Text style={styles.description}> <br /> {Strings.book_placement_component.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
            <br /><Button title={Strings.book_placement_component.MYBOOKSHELVE_STRING_RETURN} color="#33FF8A" onPress={() => props.returnBook(props.id)} />
        </Text>);
    } else {
        content = (<Text style={styles.description}> <br /> {Strings.book_placement_component.MYBOOKSHELVE_STRING_OWNER}: {owner.name}
            <br /><Button title={holder.email === "" ?
                owner.name : holder.name} color="#808080" onPress={() => { }} />
        </Text>);
    }
    return content;
}

export default BookPlacementComponent;

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