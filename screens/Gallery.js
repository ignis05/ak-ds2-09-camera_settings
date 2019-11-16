import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, ToastAndroid } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import Button from '../components/Button'
import Photo from '../components/Photo'

const styles = StyleSheet.create({
	wrapper: { flex: 1, paddingTop: 10 },
	smallButton: { fontSize: 20, flex: 1, textAlign: 'center', display: 'flex', fontWeight: 'bold' },
	buttonsWrapper: { width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 10 },
})

class Gallery extends Component {
	static navigationOptions = {
		title: 'Photos saved on device',
	}

	constructor(props) {
		super(props)
		this.state = { largePhotos: false, photos: [], refreshing: false }

		this.updatePhotos = this.updatePhotos.bind(this)
		this.switchDisplay = this.switchDisplay.bind(this)
		this.openBigPhoto = this.openBigPhoto.bind(this)
		this.openCamera = this.openCamera.bind(this)
		this.deleteSelected = this.deleteSelected.bind(this)
		this.markPhoto = this.markPhoto.bind(this)
	}

	componentDidMount() {
		this.updatePhotos()
	}

	async deleteSelected() {
		if (!this.state.photos.some(ph => ph.marked)) {
			ToastAndroid.showWithGravity('No photos selected', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
			return
		}

		let toDelete = this.state.photos.filter(ph => ph.marked)
		this.setState({ refreshing: true })
		await MediaLibrary.deleteAssetsAsync(toDelete)
		await this.updatePhotos()
		ToastAndroid.showWithGravity('Deleted successfully!', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
	}

	switchDisplay() {
		this.setState({ largePhotos: !this.state.largePhotos })
	}

	openBigPhoto(asset) {
		this.props.navigation.navigate('bigPhoto', { asset: asset, albumRefresh: this.updatePhotos })
	}

	markPhoto(asset) {
		console.log(asset)
		let temp = Object.assign([], this.state.photos)
		let a = temp.find(ph => ph.id == asset.id)
		a.marked = !a.marked
		this.setState({ photos: temp })
	}

	updatePhotos() {
		return new Promise((res, rej) => {
			this.setState({ refreshing: true }, async () => {
				let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
				if (status !== 'granted') {
					alert('This permission is required!')
					this.props.navigation.navigate('main')
					rej('permission failed')
					return
				}

				let obj = await MediaLibrary.getAssetsAsync({
					first: 100,
					mediaType: 'photo',
					sortBy: ['creationTime'],
				})

				this.setState({ photos: obj.assets.map(ph => ({ ...ph, marked: false })), refreshing: false })
				res('done')
			})
		})
	}

	async openCamera() {
		let { status } = await Permissions.askAsync(Permissions.CAMERA)
		if (status !== 'granted') {
			return
		}
		this.props.navigation.navigate('camera', { albumRefresh: this.updatePhotos })
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.buttonsWrapper}>
					<Button style={styles.smallButton} onTouch={this.switchDisplay}>
						Grid / List
					</Button>
					<Button style={styles.smallButton} onTouch={this.openCamera}>
						Open Camera
					</Button>
					<Button style={styles.smallButton} onTouch={this.deleteSelected}>
						Remove Selected
					</Button>
				</View>
				<FlatList
					numColumns={this.state.largePhotos ? 1 : 4}
					key={this.state.largePhotos ? 1 : 4}
					horizontal={false}
					style={styles.list}
					data={this.state.photos}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<Photo
							style={
								this.state.largePhotos
									? { width: Dimensions.get('window').width - 20, height: Dimensions.get('window').width / 4 - 20, margin: 10 }
									: { width: Dimensions.get('window').width / 4 - 20, height: Dimensions.get('window').width / 4 - 20, margin: 10 }
							}
							asset={item}
							open={this.openBigPhoto}
							mark={this.markPhoto}
						/>
					)}
					onRefresh={this.updatePhotos}
					refreshing={this.state.refreshing}
				/>
			</View>
		)
	}
}

export default Gallery
