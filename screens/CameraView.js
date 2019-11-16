import React, { Component } from 'react'
import { View, StyleSheet, Image, BackHandler, ToastAndroid } from 'react-native'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import Button from '../components/Button'
import camIcon from '../assets/images/camera.png'
import switchIcon from '../assets/images/camera_switch.png'
import gearIcon from '../assets/images/gear.png'

const styles = StyleSheet.create({
	wrapper: { flex: 1 },
	camera: { flex: 1 },
	inCamWrapper: { flex: 1, backgroundColor: 'transparent', flexDirection: 'column-reverse' },
	buttonsWrapper: { marginBottom: 10, height: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
	button: { width: 70, height: 70, borderRadius: 100, backgroundColor: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 15 },
	img: { width: 60, height: 60 },
	buttonSmall: { width: 60, height: 60 },
	imgSmall: { width: 50, height: 50 },
})

class CameraView extends Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props)
		this.state = { frontCam: false }

		this.switchHandler = this.switchHandler.bind(this)
		this.photoHandler = this.photoHandler.bind(this)
		this.settingsHandler = this.settingsHandler.bind(this)
		// this.handleBackPress = this.handleBackPress.bind(this)
	}

	switchHandler() {
		this.setState({ frontCam: !this.state.frontCam })
	}

	async photoHandler() {
		if (this.camera) {
			let foto = await this.camera.takePictureAsync()
			await MediaLibrary.createAssetAsync(foto.uri) // domyslnie zapisuje w DCIM
			await this.props.navigation.state.params.albumRefresh()
			ToastAndroid.showWithGravity('Photo saved!', ToastAndroid.SHORT, ToastAndroid.CENTER)
		}
	}

	// obsolete cuz refreshing when photo being taken
	/* componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
	}

	handleBackPress() {
		this.props.navigation.goBack()
		this.props.navigation.state.params.albumRefresh()
		return true
	} */

	settingsHandler() {}

	render() {
		return (
			<View style={styles.wrapper}>
				<Camera ref={ref => (this.camera = ref)} style={styles.camera} type={this.state.frontCam ? Camera.Constants.Type.front : Camera.Constants.Type.back}>
					<View style={styles.inCamWrapper}>
						<View style={styles.buttonsWrapper}>
							<Button style={[styles.button, styles.buttonSmall]}>
								<Image source={gearIcon} alt={'settings'} style={styles.imgSmall} />
							</Button>
							<Button onTouch={this.photoHandler} style={styles.button}>
								<Image source={camIcon} alt={'cam'} style={styles.img} />
							</Button>
							<Button onTouch={this.switchHandler} style={[styles.button, styles.buttonSmall]}>
								<Image source={switchIcon} alt={'switch'} style={styles.imgSmall} />
							</Button>
						</View>
					</View>
				</Camera>
			</View>
		)
	}
}

export default CameraView
