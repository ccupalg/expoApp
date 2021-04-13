import React from 'react'
import { TouchableOpacity } from 'react-native'
import { intersection, keys, get } from 'lodash'
import { rem, screenDimension } from '../Services/utils'
import Colors from '../Theme/Colors'

export const TmTouchableOpacity = (props) => {
	const matchingStyles = intersection(keys(props), keys(styles)).map((s) =>
		get(styles, s),
	)
	return (
		<TouchableOpacity {...props} style={[styles.default, ...matchingStyles]} />
	)
}

const styles = {
	default: {},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		height: rem(100),
		width: rem(100),
		borderRadius: rem(50),
		backgroundColor: 'gray',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	delete: {
		elevation: rem(3),
		borderRadius: rem(5),
		margin: rem(10),
		backgroundColor: Colors.error,
		shadowColor: 'rgba(55, 71, 133, 0.1)',
	}
}
