import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Text, TextInput, Button, ProgressBar } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { map, isObject } from 'lodash'
import { SocialIcon } from 'react-native-elements'
import { loginSuccess } from 'App/Stores/userStore'
import { navigateAndReset } from 'App/Services/navService'
import Assets from '../../Assets'
import { TmImage } from '../../Components/TmImage'
import { TmView } from '../../Components/TmView'
import TmModal from '../../Components/TmModal'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  //states
  const [loginInfo, setLoginInfo] = useState({})
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [loginInProgress, setLoginInProgress] = useState(false)
  const [showLoginWithEmailForm, setShowLoginWithEmailForm] = useState(false)
  const [confirmationMethod, setConfirmationMethod] = useState(null)

  //selectors
  const userReducer = useSelector((state) => state.userReducer)

  //initialization
  const loginFor = [
    { name: 'google', title: 'Sign In With Google' },
    { name: 'facebook', title: 'Sign In With Facebook' },
    { name: 'envelope', title: 'Sign In With Email Id' },
  ]

  const handleLogin = async (lf) => {
    return;
  }

  useEffect(() => {
    decideScreen()
  }, [userReducer])

  const decideScreen = () => {
    console.log('userReducer??', userReducer)
    if (userReducer?.signedIn && (userReducer?.isTeacher || userReducer?.isParent || userReducer?.isStudent)) {
      navigateAndReset('HomeScreen')
    } else if (userReducer?.signedIn) {
      navigateAndReset('WhoAreYou')
    }
  }

  const handlePhoneLogin = async () => {
    navigateAndReset('HomeScreen')
  }

  const handleConfirmCode = async () => {
    return;
  }

  const handleCloseLoginWithEmailForm = () => {
    setShowLoginWithEmailForm(false)
    setLoginInProgress(false)
    setLoginInfo({})
  }

  const handleLoginWithEmail = async () => {
    return;
  }

  return (
    <TmView>
      <ProgressBar visible={loginInProgress} indeterminate={true} progress={0.5} color={'orange'} />
      <ScrollView>
        <TmView mediumMarginTop>
          <TmView loginContainer>
            <TmImage
              loginScreen
              source={Assets.Logo}
            />
            {!confirmationMethod ? (<TmView><TmView mediumMarginTop>
              <TextInput
                mode="outlined"
                placeholder="enter phone no"
                onChangeText={(phone) => setPhone(phone)}
                value={phone}
              />
            </TmView>
              <TmView mediumMarginTop>
                <Button mode="contained" onPress={handlePhoneLogin} disabled={loginInProgress}>
                  <Text style={{ color: 'white' }}>Sign in with phone</Text>
                </Button>
              </TmView></TmView>)
              :
              <TmView>
                <TmView mediumMarginTop>
                  <TextInput
                    mode="outlined"
                    placeholder="enter code sent on phone"
                    onChangeText={(codeStr) => setCode(codeStr)}
                    value={code}
                  />
                </TmView>
                <TmView mediumMarginTop>
                  <Button mode="contained" onPress={handleConfirmCode}>
                    <Text style={{ color: 'white' }}>Confirm code</Text>
                  </Button>
                </TmView></TmView>
            }
          </TmView>
          {map(loginFor, (lf, indx) => (
            <SocialIcon
              key={indx}
              title={lf.title}
              button
              type={lf.name}
              disabled={loginInProgress}
              onPress={() => handleLogin(lf.name)}
            />
          ))}
        </TmView>
        <TmModal
          title={'Login with email id'}
          submitTitle='Login'
          loading={loginInProgress || false}
          fieldsData={[
            {
              type: 'input',
              label: 'Enter email id',
              onChangeText: (email) => setLoginInfo({ ...loginInfo, email }),
              value: loginInfo?.email,
            },
            {
              type: 'input',
              label: 'Enter email password',
              onChangeText: (password) => setLoginInfo({ ...loginInfo, password }),
              value: loginInfo?.password,
              secureTextEntry: true,
            }
          ]}
          visible={showLoginWithEmailForm}
          onRequestClose={handleCloseLoginWithEmailForm}
          onSubmit={handleLoginWithEmail}
        />
      </ScrollView>
    </TmView>
  )
}
