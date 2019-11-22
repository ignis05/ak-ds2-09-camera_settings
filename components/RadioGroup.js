import React, { Component } from 'react'
import { View, Text } from 'react-native'
import RadioButton from './RadioButton'

class RadioGroup extends Component {
	constructor(props) {
		super(props)
		this.state = { selected: this.props.defaultValue }

		this.switchHandler = this.switchHandler.bind(this)
	}

	switchHandler(val) {
		console.log('switch selected to: ' + val)
		this.setState({ selected: val })
		if(this.props.onChange) this.props.onChange(val)
	}

	render() {
		return (
			<View style={{borderColor:'white', borderTopWidth:3}}>
				<Text style={{textAlign:'right', color:'white', fontSize:20}}>{this.props.title}</Text>
				{this.props.data.map(val => (
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 20 }} key={val.val}>
						<RadioButton color="#E91E63" selected={this.state.selected == val} onPress={this.switchHandler} val={val} />
						<Text style={{ color: 'white', marginLeft: 20 }}>{val.text}</Text>
					</View>
				))}
			</View>
		)
	}
}

export default RadioGroup
