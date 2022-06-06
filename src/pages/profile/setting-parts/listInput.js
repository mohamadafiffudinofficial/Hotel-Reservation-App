import { TextInput, StyleSheet } from "react-native";
import { ListItem, Button } from "react-native-elements";


export default ListInput = ({ label, value, data, setData, handleOpenEdit, handleEditData }) => {
    return (
        <ListItem.Accordion
            content={
                <>
                    <ListItem.Content style={styles.inputEdit}>
                        <ListItem.Title style={[styles.textBold, { marginRight: 20 }]}>{label}</ListItem.Title>
                        <ListItem.Title>{value ? value : '-'}</ListItem.Title>
                    </ListItem.Content>
                </>
            }
            isExpanded={data.isOpen}
            onPress={() => handleOpenEdit(setData, data)}
            containerStyle={{ padding: 10 }}
        >
            <ListItem bottomDivider containerStyle={{ padding: 5 }}>
                <ListItem.Content style={styles.inputEdit}>
                    <TextInput placeholder="First name" onChangeText={(e) => setData({ ...data, value: e })} style={styles.textInput} value={data.value} />
                    <Button onPress={() => handleEditData()} containerStyle={{ marginLeft: 15 }} titleStyle={{ fontSize: 14, paddingHorizontal: 10 }} title="Change" />
                </ListItem.Content>
            </ListItem>
        </ListItem.Accordion>
    )
}

const styles = StyleSheet.create({
    textBold: {
        fontWeight: 'bold'
    },
    textInput: {
        fontSize: 15,
        padding: 5,
        flexGrow: 1
    },
    inputEdit: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: 'space-between'
    }
})