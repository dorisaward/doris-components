import { StyleSheet, Text } from 'react-native'
import { useTheme } from '../theme/useTheme'

interface HeadingProps {
	text: string
	level: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = ({ text, level }: HeadingProps) => {
	const {
		theme: { headingTextColour, paddingLarge },
	} = useTheme()
	return (
		<Text
			style={[
				styles[`heading${level}`],
				{ color: headingTextColour, paddingBottom: paddingLarge },
			]}
		>
			{text}
		</Text>
	)
}

const styles = StyleSheet.create({
	heading1: {
		fontSize: 40,
		textAlign: 'center',
		fontWeight: '700',
		lineHeight: 40,
	},
	heading2: {
		fontSize: 30,
		textAlign: 'left',
		fontWeight: '600',
		lineHeight: 30,
	},
	heading3: {
		fontSize: 28,
		textAlign: 'left',
		fontWeight: '500',
		lineHeight: 28,
	},
	heading4: {
		fontSize: 26,
		textAlign: 'left',
		fontWeight: '400',
		lineHeight: 26,
	},
	heading5: {
		fontSize: 24,
		textAlign: 'left',
		fontWeight: '300',
		lineHeight: 24,
	},
	heading6: {
		fontSize: 20,
		textAlign: 'left',
		fontWeight: '200',
		lineHeight: 20,
	},
})
