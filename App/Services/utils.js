
import { Dimensions } from 'react-native';

// let token
// export const storeToken = (t) => (token = t)
// export const getToken = () => token

const entireScreenWidth = Dimensions.get('window').width
const REM = entireScreenWidth / 376
export const rem = n => n * REM

export const screenDimension = {
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height
}