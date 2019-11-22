import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, DrawerLayoutAndroid, ToastAndroid, ScrollView } from 'react-native'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import Button from '../components/Button'
import camIcon from '../assets/images/camera.png'
import switchIcon from '../assets/images/camera_switch.png'
import gearIcon from '../assets/images/gear.png'
import RadioGroup from '../components/RadioGroup'

const styles = StyleSheet.create({
	wrapper: { flex: 1 },
	camera: { flex: 1 },
	inCamWrapper: { flex: 1, backgroundColor: 'transparent', flexDirection: 'column-reverse' },
	buttonsWrapper: { marginBottom: 10, height: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
	button: { width: 70, height: 70, borderRadius: 100, backgroundColor: '#E91E63', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 15 },
	img: { width: 60, height: 60 },
	buttonSmall: { width: 60, height: 60 },
	imgSmall: { width: 50, height: 50 },
	drawerWrapper: { flex: 1, padding: 25 },
})

class CameraView extends Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props)
		this.state = { frontCam: false, ratio: '16:9', wb: 0, fm: 3, ps: false }

		this.switchHandler = this.switchHandler.bind(this)
		this.photoHandler = this.photoHandler.bind(this)
		this.settingsHandler = this.settingsHandler.bind(this)
	}

	switchHandler() {
		this.setState({ frontCam: !this.state.frontCam })
	}

	async photoHandler() {
		if (this.camera) {
			let foto = await this.camera.takePictureAsync()
			ToastAndroid.showWithGravity('Photo saved!', ToastAndroid.SHORT, ToastAndroid.CENTER)
			await MediaLibrary.createAssetAsync(foto.uri) // domyslnie zapisuje w DCIM
			await this.props.navigation.state.params.albumRefresh()
		}
	}

	settingsHandler() {
		this.drawer.openDrawer()
	}

	render() {
		console.log(Camera.Constants)
		return (
			<DrawerLayoutAndroid
				drawerBackgroundColor="rgba(0,0,0,0.5)"
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				ref={ref => (this.drawer = ref)}
				renderNavigationView={() => (
					<View style={styles.drawerWrapper}>
						<Text style={{ color: 'white', fontSize: 28 }}>Settings</Text>
						<ScrollView>
							<RadioGroup color="#E91E63" title="WHITE BALANCE" data={Camera.Constants.WhiteBalance} defaultValue={0} onChange={val => this.setState({ wb: val })} />
							<RadioGroup color="#E91E63" title="FLASH MODE" data={Camera.Constants.FlashMode} defaultValue={3} onChange={val => this.setState({ fm: val })} />
							<RadioGroup color="#E91E63" title="CAMERA RATIO" data={{ '4:3': '4:3', '16:9': '16:9' }} defaultValue={'16:9'} onChange={val => this.setState({ ratio: val })} />
						</ScrollView>
					</View>
				)}
			>
				<View style={styles.wrapper}>
					<Camera
						ref={ref => (this.camera = ref)}
						style={styles.camera}
						ratio={this.state.ratio}
						whiteBalance={this.state.wb}
						pictureSize={this.state.ps}
						flashMode={this.state.fm}
						type={this.state.frontCam ? Camera.Constants.Type.front : Camera.Constants.Type.back}
					>
						<View style={styles.inCamWrapper}>
							<View style={styles.buttonsWrapper}>
								<Button onTouch={this.settingsHandler} style={[styles.button, styles.buttonSmall]}>
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
			</DrawerLayoutAndroid>
		)
	}
}

export default CameraView
