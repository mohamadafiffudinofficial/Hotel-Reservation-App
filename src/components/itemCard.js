import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-elements';

export default ItemCard = ({ id, hotel, name, rating, price, image, city, isFavorited, handleClickItemCard, handleClickFavorite }) => {
    return (
        <TouchableOpacity onPress={() => handleClickItemCard(id, price)} style={[styles.container, styles.boxShadow]}>
            <TouchableOpacity style={styles.favoriteIcon} onPress={() => handleClickFavorite(hotel, isFavorited)}>
                <Ionicons name="heart" size={30} color={isFavorited ? '#fc00a0' : '#fff'} />
            </TouchableOpacity>
            <Image
                source={{ uri: image }}
                containerStyle={styles.item}
                resizeMode='cover'
            />
            <View style={styles.descriptionContainer}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start", width: '80%' }}>
                    <Text style={styles.textTitle}>{name}</Text>
                    <AirbnbRating
                        count={5}
                        defaultRating={rating}
                        size={18}
                        showRating={false}
                        isDisabled
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="pin" size={16} color='#b80028' />
                        <Text>{city}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.textPrice}>$ {price}</Text>
                    <Text>/ Per night</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: '100%',
        position: 'relative',
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 7,
    },
    boxShadow: {
        shadowColor: '#808080',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2.65,

        elevation: 4.5,
    },
    favoriteIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        elevation: 10,
        zIndex: 1
    },
    item: {
        flex: 1,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#489687',
    }
})