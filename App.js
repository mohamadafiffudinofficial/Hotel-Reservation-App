import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Booking from './src/pages/booking/booking';
import Detail from './src/pages/detail/detail';
import IndexHome from './src/pages/home'
import Login from './src/pages/login/login'
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './src/store';


const HomeStack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack.Navigator
          initialRouteName='Index'
          screenOptions={{
            tabBarActiveTintColor: '#489687',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#489687',
            },
          }}>

          <HomeStack.Screen
            name='Index'
            component={IndexHome}
            options={() => ({
              headerShown: false
            })}
          />

          <HomeStack.Screen
            name='Detail'
            component={Detail}
            options={() => ({
              headerShown: false
            })}
          />

          <HomeStack.Screen
            name='Booking'
            component={Booking}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  color='#fff'
                  size={30}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
          <HomeStack.Screen
            name='Login'
            component={Login}
            options={() => ({
              headerShown: false
            })}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}