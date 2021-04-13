import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { ListItem, Left, Body, Right, Thumbnail } from 'native-base'

import { logOut } from 'App/Stores/userStore'
import { navigateAndReset } from 'App/Services/navService'
import { TmText } from "../Components/TmText"
import { TmIcon } from "../Components/TmIcon"
import { TmView } from "../Components/TmView"
import Assets from '../Assets'
import { Config } from '../Config'

export default ({ navigation }) => {
	const dispatch = useDispatch()

	const defaultDrawerData = [
		{
			label: 'Login/Signup',
			_onPress: () => handleLogin(),
			icon: 'login',
		}
	]
	//states
	const [drawerData, setDrawerData] = useState(defaultDrawerData)

	//selectors
	const userReducer = useSelector((state) => state.userReducer)

	//hooks
	useEffect(() => {
		if (userReducer.signedIn) {
			setDrawerData([
				{
					label: 'Home',
					_onPress: () => handleHomeClick(),
					icon: 'home',
				},
				{
					label: 'Profile',
					_onPress: () => handleProfileClicked(),
					icon: 'shield-account',
				},
				{
					label: 'Logout',
					_onPress: () => handleLogout(),
					icon: 'logout',
				}
			])
		} else {
			setDrawerData(defaultDrawerData)
		}
	}, [userReducer])

	const handleLogout = async () => {
		// try {
		// 	await LoginManager.logOut() //for facebook
		// 	await GoogleSignin.revokeAccess() //for google
		// 	await GoogleSignin.signOut() //for google
		// 	await auth().signOut()
		// } catch (error) {
		// 	console.log('GoogleSignin logOut error??', error)
		// }
		dispatch(logOut({}))
		handleLogin()
	}

	const handleHomeClick = () => {
		navigation.closeDrawer()
		navigateAndReset('HomeScreen')
	}

	const handleProfileClicked = () => {
		navigation.closeDrawer()
		navigation.navigate('ProfileScreen', {})
	}

	const handleLogin = () => {
		navigation.closeDrawer()
		navigateAndReset('LoginScreen')
	}

	const getRole = () => {
		if (userReducer.isTeacher) {
			return 'Teacher'
		} else if (userReducer.isStudent) {
			return 'Student'
		} else if (userReducer.isParent) {
			return 'Parent'
		} else if (userReducer.isAdmin) {
			return 'Admin'
		} else {
			return 'Guest'
		}
	}

	const renderMenus = ({ item }) => {
		return (
			<ListItem avatar onPress={() => item?._onPress()}>
				<Left>
					<TmIcon name={item.icon} />
				</Left>
				<Body>
					<TmText classHeader>{item?.label}</TmText>
				</Body>
				{/* <Right>

				</Right> */}
			</ListItem>
		)
	}

	return (
		<TmView>
			<ListItem avatar>
				<Left>
					<Thumbnail source={userReducer.signedIn && userReducer?.user?.photoURL ? { uri: userReducer?.user?.photoURL } : Assets.user} />
				</Left>
				<Body>
					<TmText classHeader>{userReducer.signedIn ? userReducer?.user?.displayName : 'Guest'}</TmText>
					<TmText note>{userReducer.signedIn ? userReducer?.user?.email : 'login to view'}</TmText>
				</Body>
			</ListItem>
			<TmView role>
				<TmText role>{'Role: ' + getRole()}</TmText>
			</TmView>
			<TmView drawerItem>
				<FlatList
					data={drawerData}
					renderItem={renderMenus}
				/>
			</TmView>
			<TmView pushBottom >
				<TmText centered>App version: {Config?.VERSION_CODE}</TmText>
			</TmView>
		</TmView>
	)
}
