import { StyleSheet, ScrollView, View, Image, Text } from "react-native"
import ItemCard from "../../components/itemCard";
import { useDispatch, useSelector } from "react-redux";
import { ADD_FAVORITE_HOTEL, REMOVE_FAVORITE_HOTEL } from "../../store/slicers/hotels";


export default Favorite = ({ navigation }) => {

    const dispatch = useDispatch();

    const favoriteHotels = useSelector(state => state.hotels.hotels.favorites)


    const handleClickFavorite = (hotel, isFavorited) => {
        isFavorited ? dispatch(REMOVE_FAVORITE_HOTEL(hotel)) : dispatch(ADD_FAVORITE_HOTEL(hotel))
    }

    const isFavorited = (id) => {
        return favoriteHotels.some((hotel) => hotel.hotelId === id)
    }

    const handleClickItemCard = (id, price) => {
        navigation.navigate('Detail', { hotelId: id, price: price })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1, marginBottom: 25 }}>
                {
                    favoriteHotels.length > 0 ?
                        favoriteHotels.map((hotel) =>
                            <ItemCard
                                key={hotel.hotelId}
                                id={hotel.hotelId}
                                hotel={hotel}
                                name={hotel.name}
                                rating={hotel.starRating}
                                price={hotel.ratesSummary.minPrice}
                                image={hotel.media.url}
                                city={hotel.location.address.cityName.split(' ').pop()}
                                isFavorited={isFavorited(hotel.hotelId)}
                                handleClickItemCard={handleClickItemCard}
                                handleClickFavorite={handleClickFavorite}
                            />
                        )
                        :
                        <View style={styles.containerNotFound}>
                            <Image
                                source={require('../../../assets/favorite-not-found.png')}
                                style={styles.item}
                            />
                            <Text style={styles.textNotFound}>* You dont have favorite hotels</Text>
                        </View>
                }
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e8e8',
        padding: 20,
        flex: 1
    },
    item: {
        height: 200,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        resizeMode: 'contain',
    },
    containerNotFound: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 650
    },
    textNotFound: {
        fontSize: 17,
        fontWeight: 'bold'
    }
});
