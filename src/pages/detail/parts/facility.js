import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';


const facilitiesIcon = {
    PARKING: 'car',
    INTERNET: 'wifi',
    RESTAURANT: 'restaurant',
    SMOKING: 'logo-no-smoking',
    HEALTH: 'fitness',
    FITNESS: 'bicycle',
}

export default Facility = ({ type }) => {
    if (Object.keys(facilitiesIcon).includes(type)) {
        return (
            <View style={styles.boxFacility}>
                <Ionicons name={facilitiesIcon[type]} size={30} color='#000' />
                <Text style={styles.textFacility}>{type}</Text>
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    boxFacility: {
        minWidth: 85,
        height: 85,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 7,
        marginRight: 15
    },
    textFacility: {
        fontSize: 13
    },
})