import { useState } from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import { Button, ListItem, } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import useAuth from "../../libs/auth"
import { SET_AUTHENTICATED, SET_USER } from "../../store/slicers/user"
import ListGender from "./setting-parts/listGender"
import ListInput from "./setting-parts/listInput"
import ListPhone from "./setting-parts/listPhone"


const GENDER_OPTIONS = ['Male', 'Women']

export default Setting = ({ navigation }) => {

    const { isAuthenticated } = useAuth()
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState({
        value: '',
        isOpen: false
    })
    const [lastName, setLastName] = useState({
        value: '',
        isOpen: false
    })
    const [email, setEmail] = useState({
        value: '',
        isOpen: false
    })
    const [gender, setGender] = useState({
        value: '',
        isOpen: false
    })
    const [phoneNumberPrefix, setPhoneNumberPrefix] = useState('+62')
    const [phoneNumber, setPhoneNumber] = useState({
        value: '',
        isOpen: false
    })

    const handleOpenEdit = (setData, data) => {
        if (!isAuthenticated) return;
        setData({ ...data, isOpen: !data.isOpen });
    }

    const handleEditFirstName = () => {
        const userData = { ...user, firstName: firstName.value }
        dispatch(SET_USER(userData))
        setFirstName({ isOpen: !firstName.isOpen, value: '' })
    }

    const handleEditLastName = () => {
        const userData = { ...user, lastName: lastName.value }
        dispatch(SET_USER(userData))
        setLastName({ isOpen: !lastName.isOpen, value: '' })
    }

    const handleEditEmail = () => {
        const userData = { ...user, email: email.value }
        dispatch(SET_USER(userData))
        setEmail({ isOpen: !email.isOpen, value: '' })
    }

    const handleEditPhoneNumber = () => {
        const userData = { ...user, phoneNumber: `${phoneNumberPrefix}${phoneNumber.value}` }
        setPhoneNumber({ isOpen: !phoneNumber.isOpen, value: '' })
        dispatch(SET_USER(userData))
    }

    const handleEditGender = (value) => {
        const userData = { ...user, gender: GENDER_OPTIONS[value] }
        dispatch(SET_USER(userData))
        setGender({ isOpen: !gender.isOpen, value: GENDER_OPTIONS[value] })
    }

    const handlePressAuth = () => {
        if (isAuthenticated) {
            dispatch(SET_USER({
                firstName: '',
                lastName: '',
                email: '',
                gender: '',
                phone: ''
            }))
            dispatch(SET_AUTHENTICATED(false))
        } else {
            navigation.replace('Login')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <Text style={[styles.textTitle, styles.textBold, { marginBottom: 10 }]}>MY PROFILE</Text>
                <ListInput
                    label="First name"
                    value={user.firstName}
                    data={firstName}
                    setData={setFirstName}
                    handleOpenEdit={handleOpenEdit}
                    handleEditData={handleEditFirstName}
                />
                <ListInput
                    label="Last name"
                    value={user.lastName}
                    data={lastName}
                    setData={setLastName}
                    handleOpenEdit={handleOpenEdit}
                    handleEditData={handleEditLastName}
                />
                <ListInput
                    label="Email"
                    value={user.email}
                    data={email}
                    setData={setEmail}
                    handleOpenEdit={handleOpenEdit}
                    handleEditData={handleEditEmail}
                />
                <ListGender
                    label="Gender"
                    value={user.gender}
                    data={gender}
                    setData={setGender}
                    options={GENDER_OPTIONS}
                    handleOpenEdit={handleOpenEdit}
                    handleEditData={handleEditGender}
                />
                <ListPhone
                    label="Phone number"
                    value={user.phoneNumber}
                    data={phoneNumber}
                    setData={setPhoneNumber}
                    prefix={phoneNumberPrefix}
                    setPhoneNumberPrefix={setPhoneNumberPrefix}
                    handleOpenEdit={handleOpenEdit}
                    handleEditData={handleEditPhoneNumber}
                />
            </View>
            <View style={[styles.listContainer, { marginTop: 30 }]}>
                <Text style={[styles.textTitle, styles.textBold]}>SUPPORT</Text>
                <ListItem bottomDivider>
                    <ListItem.Content style={styles.list}>
                        <ListItem.Title style={styles.textBold}>Terms & Policy</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem onPress={() => handlePressAuth()}>
                    <ListItem.Content style={styles.list}>
                        <ListItem.Title style={[styles.textBold, { color: '#c90237' }]}>{isAuthenticated ? 'Log out' : 'Login'}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    listContainer: {
        padding: 15,
        backgroundColor: '#fff'
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 18,
    },
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
        flexWrap: 'nowrap'
    }
})