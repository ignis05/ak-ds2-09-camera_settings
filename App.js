import { createStackNavigator, createAppContainer } from 'react-navigation'
import MainScreen from './screens/MainScreen'
import Gallery from './screens/Gallery'
import BigPhoto from './screens/BigPhoto'
import CameraView from './screens/CameraView'

const Root = createStackNavigator(
	{
		main: MainScreen,
		gallery: Gallery,
		bigPhoto: BigPhoto,
		camera: CameraView,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#E91E63',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		},
	}
)

const App = createAppContainer(Root)

export default App
