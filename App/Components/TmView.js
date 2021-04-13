import React from 'react'
import { Dimensions, View } from 'react-native'
import { rem } from '../Services/utils'
import { intersection, keys, get } from 'lodash'
import Assets from '../Assets'

export const TmView = (props) => {
	const matchingStyles = intersection(keys(props), keys(styles)).map((s) =>
		get(styles, s),
	)
	return <View {...props} style={[styles.default, ...matchingStyles]} />
}

const styles = {
	default: {},
	parent: {
		flex: 1,
		// flexGrow: 1,
	},
	content: {
		marginTop: rem(30),
		margin: rem(22),
	},
	pushBottom: {
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
	white: {
		backgroundColor: Assets.Colors.white,
		marginBottom: rem(10)
	},
	whoAreYou: {
		marginTop: rem(80),
	},
	row: {
		flexDirection: 'row',
	},
	drawerItem: {
		marginTop: rem(20),
	},
	role: {
		alignItems: 'center',
		margin: rem(10),
		backgroundColor: Assets.Colors.heighLight,
		borderRadius: rem(7),
		padding: rem(5),
	},
	splashScreenLogoContainer: {
		height: '100%',
		width: '100%',
		alignContent: 'center',
		justifyContent: 'center',
		// opacity: 0.85,
	},
	headerAvatar: {
		alignItems: 'center',
	},
	mMarginLeft: {
		marginLeft: rem(5)
	},
	flexWrap: {
		flexWrap: 'wrap'
	},
	semiTransparent: {
		backgroundColor: 'rgba(121, 210, 209, 0.498)'
	},
	mediumMarginTop: {
		marginTop: rem(20),
	},
	loginContainer: {
		margin: rem(10),
		// minHeight: '100%'
	},
	changeProfilePhoto: {
		marginHorizontal: rem(10),
		alignItems: 'center',
	},
	displayNameInput: { marginHorizontal: 10, marginVertical: 10 },
	emptyContainer: {
		margin: rem(10),
	},
	renderActions: {
		bottom: 50,
		right: Dimensions.get("window").width / 2,
		position: "absolute",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.5,
		// zIndex: 2,
		backgroundColor: "transparent",
	},
	centered: {
		// justifyContent: 'center',
		// alignItems: 'center',
		// alignContents: 'center',
	},
	flexGrow: {
		flexGrow: 1,
	},
	centeredVertical: {
		alignItems: 'center',
	},
	likeDislikeContainer: {
		marginLeft: rem(5),
		marginRight: rem(5),
	}
}
