import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { GET_HOTEL_DETAIL } from "../../service/api-path"
import http from "../../service/http"
import HeroDetailHotel from './parts/hero'
import Review from "./parts/review"
import Facility from "./parts/facility"
import useAuth from '../../libs/auth'


export default DetailItem = ({ route, navigation }) => {

    const { hotelId, price } = route.params
    const { isAuthenticated } = useAuth()

    const [detailHotel, setDetailHotel] = useState(null)

    const getDetailHotel = async () => {
        const response = await http.get(GET_HOTEL_DETAIL, {
            params: {
                hotel_id: hotelId
            }
        })
        setDetailHotel(response.data)
    }

    const handlePressBooking = () => {
        if (!isAuthenticated) {
            return navigation.navigate('Login')
        }
        navigation.navigate('Booking', { hotelId, price })
    }

    useEffect(() => {
        getDetailHotel()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {
                    detailHotel &&
                    <View>
                        <HeroDetailHotel
                            image={detailHotel.images[0].imageUrl}
                            name={detailHotel.name}
                            city={detailHotel.location.address.cityName.split(' ').pop()}
                            rating={hotelId.starRating}
                            price={price}
                        />
                        <View style={styles.container}>
                            <View style={styles.marginVerticalMd}>
                                <Text style={styles.textTitle}>About</Text>
                                <Text>{detailHotel.description}</Text>
                            </View>
                            <View style={styles.marginVerticalMd}>
                                <Text style={styles.textTitle}>Facilities</Text>
                                <ScrollView horizontal>
                                    {
                                        detailHotel.hotelFeatures.hotelAmenities?.map((facility, idx) => (
                                            <Facility
                                                key={idx}
                                                type={facility.type}
                                            />
                                        ))
                                    }
                                </ScrollView>
                            </View>
                            <View style={styles.marginVerticalMd}>
                                <Text style={styles.textTitle}>Reviews</Text>
                                {
                                    detailHotel.guestReviews?.map((review, idx) => {
                                        if (review.reviewTextPositive || review.reviewTextNegative) {
                                            return (
                                                <Review
                                                    key={idx}
                                                    name={review.firstName}
                                                    negative={review.reviewTextNegative}
                                                    positive={review.reviewTextPositive}
                                                    rating={parseFloat(review.overallScore) - 5}
                                                />
                                            )
                                        }
                                    })
                                }
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
            {
                detailHotel &&
                <TouchableOpacity style={styles.floatingButton} onPress={() => handlePressBooking()}>
                    <Text style={styles.bookButtonText}>Book this hotel</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginVertical: 15
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    boxReview: {
        width: '100%',
        minHeight: 150,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        borderRadius: 7,
    },
    reviewRating: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 60,
        padding: 5,
        backgroundColor: '#ff5330',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 7
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    reviewCateogry: {
        fontWeight: 'bold'
    },
    marginVerticalMd: {
        marginVertical: 10
    },
    floatingButton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#489687',
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
})