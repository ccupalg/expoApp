import React from "react"
import {
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView
} from "react-native";
import { Input, Item, Label, ListItem, Body } from 'native-base'
import { Avatar } from "react-native-elements"
import { map } from "lodash"
import { Checkbox } from 'react-native-paper'

import { TmIcon } from "./TmIcon"

export default TmModal = (props) => {
	const { onSubmit, title, subTitle, submitTitle, onRequestClose, fieldsData, loading, ...otherProps } = props;

	const handleClose = () => {
		onRequestClose()
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			onRequestClose={handleClose}
			{...otherProps}
		>
			<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(100, 100, 100, 0.5)' }}>
				<View style={styles.modalView}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
						<Text style={styles.modalTitle}>{title}</Text>
						<TmIcon name={"close"} size={60} color='red' onPress={handleClose} />
					</View>
					{/* <View style={styles.subtitle}>
						<Text style={styles.modalSubTitle}>{subTitle}</Text>
					</View> */}
					<ScrollView>
						{map(fieldsData, (item, fieldsData_key) => {
							const { type, label, ...otherFormProps } = item
							if (type === 'input') {
								return (
									<View key={fieldsData_key} style={{ marginHorizontal: 10 }}>
										<Item stackedLabel>
											<Label>{label}</Label>
											<Input {...otherFormProps} />
										</Item>
									</View>
								)
							} else if (type === 'checkbox') {
								return (
									<View key={fieldsData_key} style={{ marginHorizontal: 10 }}>
										{/* <Item stackedLabel>
											<Label>{label}</Label>
											<Input {...otherFormProps} />
										</Item> */}
										<ListItem>
											<Checkbox {...otherFormProps} />
											<Body>
												<Text>{label}</Text>
											</Body>
										</ListItem>
									</View>
								)
							} else if (type === 'upload_picture') {
								return (
									<View key={fieldsData_key} style={{ marginHorizontal: 10, alignItems: 'center' }}>
										<Avatar
											rounded
											showAccessory
											activeOpacity={0.7}
											size='xlarge'
											{...otherFormProps}
										/>
									</View>
								)
							}
						})}
					</ScrollView>
					<TouchableOpacity
						disabled={loading}
						style={[styles.submitButton, loading && { backgroundColor: 'gray' }]}
						onPress={onSubmit}
					>
						<Text style={styles.submitTitle}>{submitTitle}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		// padding: 35,
		// alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		height: '80%'
	},
	textInput: {
		marginBottom: 10,
		borderRadius: 5,
		borderWidth: .5,
		textAlign: 'left',
		marginHorizontal: 10,
	},
	submitButton: {
		borderRadius: 15,
		backgroundColor: '#34A34F',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10
	},
	submitTitle: {
		paddingVertical: 10,
		color: 'white',
		fontWeight: 'bold'
	},
	subtitle: {
		margin: 10,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	modalSubTitle: {
		fontSize: 16,
		fontWeight: '900',
		color: 'gray',
	},
});