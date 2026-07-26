import { BodyText } from './components/BodyText'
import { Container } from './components/Container'
import { Heading, HeadingProps } from './components/Heading'
import { ThemeToggle } from './components/implementedComponents/ThemeToggle'
import { Toggle, ToggleProps } from './components/Toggle'
import { useTheme, ThemeProvider } from './theme/useTheme'

export {
	BodyText,
	Container,
	Heading,
	HeadingProps,
	ThemeProvider,
	ThemeToggle,
	Toggle,
	ToggleProps,
	useTheme,
}

// import { registerRootComponent } from 'expo'
//
// import App from './App'
//
// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App)
