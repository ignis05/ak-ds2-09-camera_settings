import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

class RadioButton extends Component {
	constructor(props) {
		super(props)
		this.pressHandler = this.pressHandler.bind(this)
	}
	static defaultProps = {
		size: 50,
		color: 'black',
	}
	static propTypes = {
		size: PropTypes.number,
		color: PropTypes.string,
		onPress: PropTypes.func,
	}

	pressHandler() {
		if (this.props.onPress) this.props.onPress(this.props.val)
	}

	render() {
		return (
			<TouchableOpacity
				onPress={this.pressHandler}
				style={{
					borderRadius: this.props.size * 10,
					backgroundColor: 'transparent',
					borderColor: this.props.color,
					borderWidth: this.props.size / 50,
					width: this.props.size,
					height: this.props.size,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{this.props.selected && (
					<View style={{ borderRadius: this.props.size * 10, backgroundColor: this.props.color, width: this.props.size - this.props.size / 3, height: this.props.size - this.props.size / 3 }} />
				)}
			</TouchableOpacity>
		)
	}
}

export default RadioButton
