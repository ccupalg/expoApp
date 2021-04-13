import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import SplashScreen from 'App/Containers/SplashScreen'
import LoginScreen from 'App/Containers/LoginScreen'
import HomeScreen from 'App/Containers/HomeScreen'
import TmDrawer from 'App/Components/TmDrawer'
import { useDispatch } from 'react-redux'
import { navigationRef } from 'App/Services/navService'
import ProfileScreen from '../Containers/ProfileScreen'
// import { startup } from 'App/Stores/startupStore'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */

function CustomDrawerContent(props) {
  return <TmDrawer {...props} />
}

const AppNavigator = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'STARTUP' })
  }, [])

  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <Drawer.Navigator drawerType='slide' drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Good Morning" options={{ gestureEnabled: true, swipeEnabled: true }}>
          {() => <StackNav />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: 'Login', headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile', headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
