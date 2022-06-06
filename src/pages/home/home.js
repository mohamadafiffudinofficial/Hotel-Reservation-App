import { StyleSheet, ScrollView, View } from "react-native"
import ItemFilter from "./parts/item-filter";
import Feed from "./parts/feed";
import ItemCard from "../../components/itemCard";
import { useEffect, useState } from "react";
import http from "../../service/http";
import dayjs from 'dayjs'
import { SEARCH_HOTEL, SEARCH_LOCATION, GET_HOTEL_SUGESTION } from "../../service/api-path";
import { useDispatch, useSelector } from "react-redux";
import { ADD_FAVORITE_HOTEL, REMOVE_FAVORITE_HOTEL } from "../../store/slicers/hotels";
import useAuth from '../../libs/auth'

const TODAY = dayjs().format('YYYY-MM-DD');
const HOTEL = 'HOTEL'


export default Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth()

    const favoriteHotels = useSelector(state => state.hotels.hotels.favorites)

    const [inputCity, setInputCity] = useState('Yogyakarta');
    const [inputStartDate, setInputStartDate] = useState(TODAY)
    const [inputEndDate, setInputEndDate] = useState(TODAY)
    const [hotels, setHotels] = useState([])
    const [feeds, setFeeds] = useState([])

    const handleConfirmSearch = () => {
        searchCity()
        getHotelSugestion()
    }

    const searchCity = async () => {
        const response = await http.get(SEARCH_LOCATION, {
            params: {
                search_type: HOTEL,
                name: inputCity
            }
        })

        if (response.data[0].cityID) {
            searchHotelByCity(response.data[0].cityID)
        } else {
            searchCity()
        }
    }

    const searchHotelByCity = async (cityId) => {
        const response = await http.get(SEARCH_HOTEL, {
            params: {
                date_checkin: inputStartDate,
                location_id: cityId,
                date_checkout: inputEndDate,
                sort_order: 'STAR',
            }
        })

        const hotelData = response.data.hotels.filter((hotel, idx) => {
            if (idx < 10) {
                return hotel.hotelId && hotel.thumbnailUrl && hotel.media.url
            }
        })
        setHotels(hotelData)
    }


    const getHotelSugestion = async () => {
        const response = await http.get(GET_HOTEL_SUGESTION, {
            params: {
                string: inputCity,
                get_hotels: true,
                max_results: 7
            }
        })

        const sugestionHotels = { title: 'POPULAR HOTELS', items: response.data.getHotelAutoSuggestV2.results.result.hotels }
        setFeeds([sugestionHotels])
    }

    const handleClickItemCard = (id, price) => {
        navigation.navigate('Detail', { hotelId: id, price: price })
    }

    const handleClickFavorite = (hotel, isFavorited) => {
        if (!isAuthenticated) {
            return navigation.navigate('Login')
        }
        isFavorited ? dispatch(REMOVE_FAVORITE_HOTEL(hotel)) : dispatch(ADD_FAVORITE_HOTEL(hotel))
    }

    const isFavorited = (id) => {
        return favoriteHotels.some((hotel) => hotel.hotelId === id)
    }

    useEffect(() => {
        getHotelSugestion()
        searchCity()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <ItemFilter
                setInputCity={setInputCity}
                setInputStartDate={setInputStartDate}
                setInputEndDate={setInputEndDate}
                handleConfirmSearch={handleConfirmSearch}
                inputCity={inputCity}
                inputStartDate={inputStartDate}
                inputEndDate={inputEndDate}
            />
            <View style={{ marginBottom: 20 }}>
                {
                    feeds && feeds.map((feed, idx) => <Feed key={idx} title={feed.title} items={feed.items} />)
                }
            </View>
            <View style={{ marginBottom: 20 }}>
                {
                    hotels && hotels.map((hotel) =>
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
                        />)
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e8e8',
        padding: 20,
    },
});
