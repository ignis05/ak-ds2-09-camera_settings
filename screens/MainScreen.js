import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../components/Button'
import * as Font from 'expo-font'

const styles = StyleSheet.create({
	wrapper: { flex: 1 },
	header: { flex: 1, backgroundColor: '#E91E63', alignItems: 'center', justifyContent: 'center' },
	headerText: { fontSize: 44, color: 'black', textAlign: 'center' },
	buttonWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	button: { fontSize: 24, fontWeight: 'bold' },
})

class MainScreen extends Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props)
		this.state = { fontLoaded: false }

		this.navigate = this.navigate.bind(this)
	}

	navigate() {
		this.props.navigation.navigate('gallery')
	}

	async componentWillMount() {
		await Font.loadAsync({
			customFont: require('../assets/fonts/FiraCode-Regular.ttf'),
		})
		this.setState({ fontLoaded: true })
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<Text style={[styles.headerText, this.state.fontLoaded ? { fontFamily: 'customFont' } : {}]}>Camera Settings App</Text>
					<Text>change camera white balance</Text>
					<Text>change camera flash mode</Text>
					<Text>change camera picture size</Text>
					<Text>change camera ratio</Text>
				</View>
				<View style={styles.buttonWrapper}>
					<Button style={styles.button} onTouch={this.navigate}>
						Start
					</Button>
				</View>
			</View>
		)
	}
}

export default MainScreen
