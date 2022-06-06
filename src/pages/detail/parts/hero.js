import { View, Text, StyleSheet } from 'react-native'
import { AirbnbRating, Image } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

export default HeroDetailHotel = ({ image, name, city, rating, price }) => {
    return (
        <View>
            <Image
                source={{ uri: image }}
                containerStyle={styles.item}
                resizeMode='cover'
            />
            <View style={[styles.flexRow, styles.contentBetween, styles.itemsCenter, styles.containerOverview]}>
                <View style={{ width: '80%' }}>
                    <Text style={[styles.textHotelName, styles.textWhite]}>{name}</Text>
                    <View style={[styles.flexRow, styles.itemsCenter, { marginTop: 2, marginBottom: 15 }]}>
                        <Ionicons name="pin" size={16} color='#b80028' style={{ marginRight: 3 }} />
                        <Text style={styles.textWhite}>{city}</Text>
                    </View>
                    <AirbnbRating
                        count={5}
                        defaultRating={rating}
                        size={12}
                        showRating={false}
                        isDisabled
                        starContainerStyle={{ position: 'absolute', bottom: -4, left: 0 }}
                    />
                </View>
                <View>
                    <Text style={[styles.textWhite, styles.textPrice]}>$ {price}</Text>
                    <Text style={[styles.textWhite, styles.textLabel, styles.textRight]}>per night</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: 350,
        position: 'relative'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        position: 'absolute',
        top: 10,
        elevation: 30,
        width: '100%',
        textAlign: 'center'
    },
    containerOverview: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
        elevation: 30,
        backgroundColor: '#000000',
        opacity: 0.75
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    itemsCenter: {
        alignItems: 'center'
    },
    contentBetween: {
        justifyContent: 'space-between'
    },
    contentCenter: {
        justifyContent: 'center'
    },
    textHotelName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textWhite: {
        color: '#fff'
    },
    textLabel: {
        fontSize: 13
    },
    textRight: {
        textAlign: 'right'
    }
})