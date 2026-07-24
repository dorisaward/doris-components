import React from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Animated,
	GestureResponderEvent,
	AccessibilityProps,
} from 'react-native'
import { useTheme } from '../theme/useTheme'

type RequiredAccessibility = Required<
	Pick<AccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>
>
type OptionalAccessibility = Partial<
	Omit<AccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>
>
type ToggleProps = {
	value: boolean
	onChange: (value: boolean) => void
} & RequiredAccessibility &
	OptionalAccessibility

const sizeConfig = {
	width: 40,
	height: 24,
	thumbSize: 20,
	thumbOffset: 4,
	borderRadius: 12,
}

export const Toggle = ({ value, onChange, ...a11yProps }: ToggleProps) => {
	const { theme } = useTheme()

	// Colors
	const activeBg = theme.success
	const inactiveBg = theme.warning
	const thumbBg = theme.backgroundSecondary

	// Animated values
	const translateX = React.useRef(new Animated.Value(value ? 1 : 0)).current

	React.useEffect(() => {
		Animated.spring(translateX, {
			toValue: value ? 1 : 0,
			useNativeDriver: true,
			speed: 12,
			bounciness: 4,
		}).start()
	}, [value])

	const handlePress = (_: GestureResponderEvent) => {
		onChange(!value)
	}

	const thumbPosition = translateX.interpolate({
		inputRange: [0, 1],
		outputRange: [
			1,
			sizeConfig.width - sizeConfig.thumbSize - sizeConfig.thumbOffset,
		],
	})

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={handlePress}
			style={[styles.container, { paddingBottom: theme.paddingSmall }]}
			accessibilityRole='switch'
			accessibilityState={{
				checked: value,
				disabled: false,
				busy: false,
			}}
			accessibilityValue={{
				text: value ? 'On' : 'Off',
			}}
			{...a11yProps}
		>
			<Animated.View
				style={[
					styles.track,
					{
						width: sizeConfig.width,
						height: sizeConfig.height,
						borderRadius: sizeConfig.borderRadius,
						backgroundColor: value ? activeBg : inactiveBg,
						opacity: 1,
					},
				]}
			>
				<Animated.View
					style={[
						styles.thumb,
						{
							width: sizeConfig.thumbSize,
							height: sizeConfig.thumbSize,
							borderRadius: sizeConfig.thumbSize / 2,
							backgroundColor: thumbBg,
							transform: [{ translateX: thumbPosition }],
						},
					]}
				/>
			</Animated.View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	track: {
		justifyContent: 'center',
		paddingHorizontal: 2,
	},
	thumb: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
})
