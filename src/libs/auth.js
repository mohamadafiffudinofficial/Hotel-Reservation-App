import { useSelector } from "react-redux"

//simple dummy for login coz i dont have api LOL
const dummyEmail = 'fajarjulianto@mail.com'
const dummyPassword = 'fajarjulianto'


export default useAuth = () => {
    const handleLogin = (email, password) => {
        return (dummyEmail === email && dummyPassword === password)
    }

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

    return {
        handleLogin,
        isAuthenticated
    }
}