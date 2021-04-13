import { StyleSheet } from 'react-native'
import Colors from 'App/Theme/Colors'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  errMsg: {
    color: Colors.error,
    fontSize: 20,
  },
  logo: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    display: 'flex',
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
})
