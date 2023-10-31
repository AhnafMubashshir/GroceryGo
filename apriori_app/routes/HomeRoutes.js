import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import AddItems from '../screens/AddItems';
import ShopItems from '../screens/ShopItems';
import ItemSelection from '../screens/ItemSelection';
import Clear from '../screens/Clear';
import User from '../screens/User';
// import Adder from '../screens/Adder';

const HomeRoutes = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 25,
                        color: '#FFF',
                        alignSelf: 'center',
                        flex: 1,
                        textAlign: 'center'
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFF'
                }}>
                {/* <Stack.Screen name="Home" component={Home} options={{ header: () => null }} /> */}
                {/* <Stack.Screen name="Clear" component={Clear} options={{ title: 'Clear all' }} /> */}
                {/* <Stack.Screen name="Clear" component={Adder} options={{ title: 'Add' }} /> */}
                <Stack.Screen name="Home" component={Home} options={{ title: 'Groceries' }} />
                <Stack.Screen name="User" component={User} options={{ title: 'Home' }} />       
                <Stack.Screen name="AddItems" component={AddItems} options={{ title: 'Add Items' }} />
                <Stack.Screen name="ShopItems" component={ShopItems} options={{ title: 'Items' }} />
                <Stack.Screen name="ItemSelection" component={ItemSelection} options={{ title: 'Select Items' }} />
                <Stack.Screen name="Cart" component={Cart} options={{ title: 'Your Cart' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default HomeRoutes