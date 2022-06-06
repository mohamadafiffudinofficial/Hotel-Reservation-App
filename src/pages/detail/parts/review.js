import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';

export default Review = ({ name, positive, negative, rating }) => {
    return (
        <View style={styles.boxReview}>
            <View style={styles.reviewRating}>
                <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 11 }}>{rating}</Text>
                <Ionicons name="star" size={11} color='#fff' />
            </View>
            <Text style={styles.reviewerName}>{name}</Text>
            <View>
                <Text style={styles.reviewCateogry}>Positive :</Text>
                <Text>{positive}</Text>
            </View>
            <View>
                <Text style={styles.reviewCateogry}>Negative :</Text>
                <Text>{negative}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    boxReview: {
        width: '100%',
        minHeight: 150,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        borderRadius: 7,
        marginVertical: 10
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
})