import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const TextRow = ({label, text}) => {
    const {
        container,
        textStyle
    } = styles;

    return (
        <View style={container}>
            <Text style={{flex: 1}}>{label}: </Text>
            <Text style={textStyle}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: '2%'
    },
    textStyle: {
        flex: 1,
        fontWeight: 'bold',
    }
});

export default TextRow;
