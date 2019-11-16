import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'

class Photo extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.pressHandler = this.pressHandler.bind(this)
		this.longPressHandler = this.longPressHandler.bind(this)
	}

	pressHandler() {
		this.props.open(this.props.asset)
	}

	longPressHandler() {
		this.props.mark(this.props.asset)
	}

	render() {
		const style = this.props.style || { width: 50, height: 50 }
		return (
			<TouchableOpacity
				style={[
					{
						backgroundColor: '#222222',
					},
					this.props.style,
				]}
				onPress={this.pressHandler}
				onLongPress={this.longPressHandler}
			>
				<ImageBackground
					style={{
						width: style.width,
						height: style.height,
					}}
					source={{ uri: this.props.asset.uri }}
				>
					<View
						style={{
							flex: 1,
							resizeMode: 'cover',
							flexDirection: 'row',
							justifyContent: 'flex-end',
							alignItems: 'flex-end',
							backgroundColor: this.props.asset.marked ? '#ffffff88' : 'transparent',
							position: 'relative',
						}}
					>
						<Text
							style={{
								color: 'white',
								backgroundColor: '#00000077',
								fontSize: (Dimensions.get('window').width / 350) * 6,
								textAlign: 'right',
								width: 'auto',
								position: 'absolute',
								right: 0,
								bottom: 0,
							}}
						>
							{this.props.asset.id}
						</Text>
						{this.props.asset.marked && (
							<View
								style={{
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'center',
									width: '100%',
								}}
							>
								<Text
									style={{
										color: '#E91E63',
										fontSize: (Dimensions.get('window').width / 350) * 40,
									}}
								>
									X
								</Text>
							</View>
						)}
					</View>
				</ImageBackground>
			</TouchableOpacity>
		)
	}
}

export default Photo
