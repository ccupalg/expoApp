import React from 'react'
import { Alert, ScrollView, ImageBackground } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Left, Body, } from "native-base"

import { TmText } from '../../Components/TmText'
import Assets from '../../Assets'
import { TmView } from '../../Components/TmView'
import { navigateAndReset } from "../../Services/navService"
import { TmTouchableOpacity } from '../../Components/TmTouchableOpacity'
import { logOut } from 'App/Stores/userStore'
import { TmIcon } from '../../Components/TmIcon'
import { screenDimension } from '../../Services/utils'

export default ({ navigation }) => {
  const userReducer = useSelector((state) => state.userReducer)

  const dispatch = useDispatch()

  // const whoAreYouOptions = [
  //   {
  //     icon: 'food-apple',
  //     title: "i'm a teacher",
  //     iconColor: '#8bc34a',
  //     _onPress: () => handleTeacher()
  //   },
  //   {
  //     icon: 'lead-pencil',
  //     title: "i'm a student",
  //     iconColor: '#eebb4d',
  //     _onPress: () => handleStudent()
  //   },
  //   {
  //     icon: 'heart',
  //     title: "i'm a parent",
  //     iconColor: '#ff3d00',
  //     _onPress: () => handleParent()
  //   },
  // ]

  // const handleTeacher = async () => {
  //   dispatch({ type: 'USER_IS_TEACHER' })

  //   //update to firestore to teachers
  //   await updateTeacher({ ...userReducer, isTeacher: true })

  //   navigateAndReset('HomeScreen')
  // }

  // const handleStudent = async () => {
  //   dispatch({ type: 'USER_IS_STUDENT' })

  //   //update to firestore to students
  //   await updateStudent({ ...userReducer, isStudent: true })

  //   navigateAndReset('HomeScreen')
  // }

  // const handleParent = async () => {
  //   dispatch({ type: 'USER_IS_PARENT' })

  //   //update to firestore to students
  //   await updateParent({ ...userReducer, isParent: true })

  //   navigateAndReset('HomeScreen')

  // }

  const handleDeleteMyAccount = () => {
    Alert.alert(
      "Are you sure want to delete your user account?",
      "It cannot be undone!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            dispatch(logOut({}))
            navigateAndReset('LoginScreen')
          }
        }
      ],
      { cancelable: true }
    )
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

  const uri = userReducer?.user?.photoURL

  return (
    <TmView>
      <Header hasTabs style={styles.header}>
        <Left>
          <TmIcon onPress={() => navigation.goBack()} color="gray" name='arrow-left' />
        </Left>
        <Body>
          <TmText mMarginLeft>{'Profile details'}</TmText>
        </Body>
      </Header>
      <ScrollView>
        <ImageBackground style={{ width: '100%', height: screenDimension.height / 3 }} resizeMode="stretch" source={uri ? { uri } : Assets.user}>
          <TmView pushBottom>
            <TmView semiTransparent>
              <TmText header role mMarginLeft>
                {userReducer?.user?.displayName + '(' + getRole() + ')'}
              </TmText>
              <TmText classHeader role mMarginLeft>
                {userReducer?.user?.email}
              </TmText>
            </TmView>
          </TmView>
        </ImageBackground>
        <TmView pushBottom >
          <TmTouchableOpacity delete onPress={handleDeleteMyAccount}>
            <TmText delete>DELETE MY ACCOUNT</TmText>
          </TmTouchableOpacity>
        </TmView>
      </ScrollView>
    </TmView>
  )
}

const styles = {
  header: {
    backgroundColor: 'white',
  },
}
