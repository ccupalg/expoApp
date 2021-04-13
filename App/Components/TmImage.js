import React from 'react'
import { Image } from 'react-native'
import { rem, screenDimension } from '../Services/utils'
import { intersection, keys, get } from 'lodash'

import Assets from '../Assets'

export const TmImage = (props) => {
	const matchingStyles =
		intersection(keys(props), keys(style)).map((s) => get(style, s)) || []
	return (
		<Image
			resizeMode='contain'
			source={Assets.defaultImg}
			{...props}
			style={[style.imgDefaultStyle, matchingStyles]}
		/>
	)
}

const style = {
	imgDefaultStyle: {
		height: '66.21%',
		resizeMode: 'cover', // or 'contain'
		borderTopLeftRadius: rem(5),
		borderTopRightRadius: rem(5),
		width: '100%',
	},
	small: {
		height: rem(25),
		width: null,
		resizeMode: 'contain',
	},
	medium: {
		height: rem(50),
		width: null,
		resizeMode: 'contain',
	},
	big: {
		height: rem(200),
		width: null,
		resizeMode: 'contain',
	},
	splashScreen: {
		height: '30%',
		alignSelf: 'center',
		resizeMode: 'contain',
	},
	profComplete: {
		height: rem(143),
		width: null,
		resizeMode: 'contain',
	},
	flagWithLady: {
		height: rem(255),
		width: rem(275),
		resizeMode: 'stretch',
		alignSelf: 'center'
	},
	loginScreen: {
		height: rem(100),
		alignSelf: 'center',
		resizeMode: 'contain',
	},
}
