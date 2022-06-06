import { StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import ItemCardHorizontal from '../../components/itemCardHorizontal'
import ProfileSummary from './parts/profile-summary'
import { useState, useEffect } from 'react'

const FAVORITES = 'FAVORITES'
const ORDERED = 'ORDERED'

export default Profile = ({ navigation }) => {

    const favoriteHotels = useSelector(state => state.hotels.hotels.favorites)
    const orderedHotels = useSelector(state => state.hotels.hotels.ordered)
    const user = useSelector(state => state.user.user)

    const [display, setDisplay] = useState(ORDERED)

    const handleOnPress = () => {
        navigation.navigate('Setting')
    }

    const handleClickItemCard = (id, price) => {
        navigation.navigate('Detail', { hotelId: id, price: price })
    }

    const handlePressFavorite = () => {
        setDisplay(FAVORITES)
    }
    const handlePressBooking = () => {
        setDisplay(ORDERED)
    }


    return (
        <ScrollView style={styles.container}>
            <ProfileSummary
                onPress={handleOnPress}
                orders={orderedHotels.length}
                favorites={favoriteHotels.length}
                handlePressBooking={handlePressBooking}
                handlePressFavorite={handlePressFavorite}
                display={display}
                user={user}
            />
            {
                display === ORDERED ?
                    orderedHotels.map((order) => {
                        return (
                            order.hotel?.hotelId &&
                            < ItemCardHorizontal
                                key={order.hotel.hotelId}
                                id={order.hotel.hotelId}
                                name={order.hotel.name}
                                rating={order.hotel.starRating}
                                price={order.price}
                                image={order.hotel.thumbnailUrl}
                                city={order.hotel.location.address.cityName.split(' ').pop()}
                                handleClickItemCard={handleClickItemCard}
                            />
                        )
                    }
                    )
                    :
                    favoriteHotels.map((hotel) => (
                        < ItemCardHorizontal
                            key={hotel.hotelId}
                            id={hotel.hotelId}
                            hotel={hotel}
                            name={hotel.name}
                            rating={hotel.starRating}
                            price={hotel.ratesSummary.minPrice}
                            image={hotel.thumbnailUrl}
                            city={hotel.location.address.cityName.split(' ').pop()}
                            handleClickItemCard={handleClickItemCard}
                        />
                    ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})