import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';

const HistoricScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[Fonts.displaySmall, {color: Colors.onPrimaryKeyColor}]}>Historic Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export { HistoricScreen };
