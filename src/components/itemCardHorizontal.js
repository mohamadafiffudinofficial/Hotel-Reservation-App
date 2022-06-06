import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AirbnbRating, Image } from 'react-native-elements'


export default ItemCardHorizontal = ({
    id,
    name,
    rating,
    price,
    image,
    city,
    handleClickItemCard
}) => {
    return (
        <TouchableOpacity onPress={() => handleClickItemCard(id, price)} style={[styles.container, styles.boxShadow]}>
            <Image
                source={{ uri: image }}
                containerStyle={styles.item}
            />
            <View style={{ width: '55%' }}>
                <Text style={styles.fontTitle}>{name}</Text>
                <Text>{city}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AirbnbRating
                        count={5}
                        defaultRating={rating}
                        size={18}
                        showRating={false}
                        isDisabled
                    />
                </View>
            </View>
            <View>
                <Text style={[styles.fontTitle, styles.fontPrimary]}>$ {price}</Text>
                <Text>/ night</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        alignItems: 'center',
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 7
    },
    boxShadow: {
        shadowColor: '#808080',
        shadowOpacity: 0.10,
        shadowRadius: 2,
        elevation: 5,
    },
    item: {
        width: 85,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderRadius: 7,
    },
    fontTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    fontPrimary: {
        color: '#489687'
    }
})