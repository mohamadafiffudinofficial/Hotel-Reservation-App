import { TextInput, StyleSheet, Picker, View } from "react-native";
import { ListItem, Button } from "react-native-elements";


export default ListPhone = ({ label, value, data, setData, handleOpenEdit, handleEditData, setPhoneNumberPrefix }) => {
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
                    <View style={{ backgroundColor: '#fff', borderRadius: 7, }}>
                        <Picker
                            style={{ width: 90 }}
                            onValueChange={(itemValue) => setPhoneNumberPrefix(itemValue)}
                        >
                            <Picker.Item label="+62" value="+62" />
                        </Picker>
                    </View>
                    <TextInput style={styles.input} placeholder="Phone number" maxLength={14} value={data.value} onChangeText={(e) => setData({ ...data, value: e })} />
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
    inputEdit: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 15,
        flexGrow: 1,
    },
})