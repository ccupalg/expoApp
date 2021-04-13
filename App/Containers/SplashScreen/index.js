import React, { useEffect } from 'react'
import { View, ImageBackground, Image, Animated } from 'react-native'
import styles from './SplashScreenStyle'
import Assets from '../../Assets'
import { TmView } from "../../Components/TmView"
import { TmImage } from "../../Components/TmImage"

export default () => {
  return (
    <TmView style={styles.container}>
      <TmView
        splashScreenLogoContainer
      >
        <TmImage
          splashScreen
          source={Assets.Logo}
        />
      </TmView>
    </TmView>
  )
}
