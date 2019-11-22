import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import Button from '../components/Button'

const styles = StyleSheet.create({
	smallButton: { fontSize: 20, flex: 1, textAlign: 'center', display: 'flex', fontWeight: 'bold' },
	buttonsWrapper: { flex: 1, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', paddingTop: 5 },
})

class BigPhoto extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('name', 'Big Photo'),
	})

	constructor(props) {
		super(props)
		this.state = {}

		this.delete = this.delete.bind(this)
		this.share = this.share.bind(this)
	}

	async delete() {
		let asset = this.props.navigation.state.params.asset
		await MediaLibrary.deleteAssetsAsync([asset])
		await this.props.navigation.state.params.albumRefresh()
		ToastAndroid.showWithGravity('Photo deleted!', ToastAndroid.SHORT, ToastAndroid.CENTER)
		this.props.navigation.goBack()
	}

	share() {
		alert(JSON.stringify(this.props.navigation.state.params.asset, null, 4))
	}

	render() {
		let asset = this.props.navigation.state.params.asset
		return (
			<View>
				<ImageBackground resizeMode={'contain'} style={{ width: '100%', height: '97%' }} source={{ uri: asset.uri }} >
					<Text
						style={{
							color: 'white',
							backgroundColor: '#00000077',
							fontSize: (Dimensions.get('window').width / 350) * 20,
							textAlign: 'right',
							width: 'auto',
							position: 'absolute',
							right: 0,
							bottom: 0,
						}}
						>
							{`${asset.width} x ${asset.height}`}
						</Text>
				</ImageBackground>
				<View style={styles.buttonsWrapper}>
					<Button style={styles.smallButton} onTouch={this.delete}>
						Delete
					</Button>
				</View>
			</View>
		)
	}
}

export default BigPhoto
