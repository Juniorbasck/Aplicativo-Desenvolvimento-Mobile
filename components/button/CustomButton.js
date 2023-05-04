import {
    Pressable,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { ResponsiveDimensions } from '../../utils/ResponsiveDimensions';
import { Fonts } from '../../utils/Fonts';

const CustomButton = ({text, onPress, backgroundColor, textColor, widthPercentage, disabled=false}) => {
    return (
        <Pressable
            style={[styles.button, {backgroundColor: backgroundColor, width: widthPercentage / 100 * Dimensions.get('screen').width}]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[Fonts.headlineSmall, {color: textColor}, styles.text]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: ResponsiveDimensions.customButton.height,
        borderRadius: 20
    },
    text: {
        textAlign: 'center',
    }
});

export { CustomButton };
