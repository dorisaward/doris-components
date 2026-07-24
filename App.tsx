import { Heading } from './components/Heading'
import { ThemeProvider } from './theme/useTheme'
import { Container } from './components/Container'
import { ThemeToggle } from './components/implementedComponents/ThemeToggle'
import { BodyText } from './components/BodyText'

export default function App() {
	return (
		<ThemeProvider>
			<Container>
				<Heading level={1} text={'This is a Heading 1'} />
				<ThemeToggle />
				<Heading level={2} text={'This is a Heading 2'} />
				<Heading level={3} text={'This is a Heading 3'} />
				<Heading level={4} text={'This is a Heading 4'} />
				<Heading level={5} text={'This is a Heading 5'} />
				<Heading level={6} text={'This is a Heading 6'} />
				<BodyText>This is body text</BodyText>
			</Container>
		</ThemeProvider>
	)
}
