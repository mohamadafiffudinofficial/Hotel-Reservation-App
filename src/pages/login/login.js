import { StyleSheet, View, Text, ToastAndroid } from "react-native"
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import useAuth from "../../libs/auth"
import { useDispatch } from "react-redux";
import { SET_AUTHENTICATED, SET_USER } from "../../store/slicers/user";

export default Login = ({ navigation }) => {

    const dispatch = useDispatch()
    const { handleLogin } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const [isError, setIsError] = useState(false)

    const showToast = (children) => {
        ToastAndroid.show(children, ToastAndroid.LONG);
    };

    const handlePressAuth = () => {
        setIsError(false)
        const isLogin = handleLogin(email, password)
        if (isLogin) {
            const user = {
                email,
                password
            }
            dispatch(SET_USER(user))
            dispatch(SET_AUTHENTICATED(true))
            if (navigation.canGoBack()) {
                navigation.goBack()
            } else {
                navigation.navigate('Index')
            }

            return showToast('Login Success!');
        }
        setIsError(true)
        return showToast('Username or password is wrong!')
    }

    return (
        <View style={styles.container}>
            <View style={styles.sectionOne}>
                <Text style={styles.textTitle}>Sign in</Text>
            </View>
            <View style={styles.sectionForm}>
                <Input
                    placeholder='Email'
                    autoComplete="email"
                    onChangeText={(e) => setEmail(e)}
                    leftIcon={
                        <Ionicons name="mail" size={18} style={{ marginRight: 10 }} />
                    }
                    errorMessage={isError && 'Username or password is wrong'}
                />
                <Input
                    placeholder='Password'
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry={isVisiblePassword ? false : true}
                    leftIcon={
                        <Ionicons onPress={() => setIsVisiblePassword(!isVisiblePassword)} name={isVisiblePassword ? 'eye' : 'eye-off'} size={18} style={{ marginRight: 10 }} />
                    }
                    errorMessage={isError && 'Username or password is wrong'}
                />
                <Button
                    onPress={() => handlePressAuth()}
                    title="Login"
                    titleStyle={{ fontWeight: '600' }}
                    buttonStyle={{
                        backgroundColor: '#489687',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 7,
                        paddingVertical: 10
                    }}
                    containerStyle={{
                        width: '100%',
                        marginVertical: 10,
                    }}
                />
                <Text >Forgot your password?</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#489687',
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff'
    },
    sectionOne: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionForm: {
        backgroundColor: '#fff',
        flex: 4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
})