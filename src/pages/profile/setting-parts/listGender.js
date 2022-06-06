import { StyleSheet } from "react-native";
import { ListItem, ButtonGroup } from "react-native-elements";


export default ListGender = ({ label, value, data, setData, handleOpenEdit, options, handleEditData }) => {
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
                <ListItem.Content >
                    <ButtonGroup
                        buttons={options}
                        selectedIndex={options.findIndex((el) => el === data.value)}
                        onPress={(value) => handleEditData(value)}
                    />
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