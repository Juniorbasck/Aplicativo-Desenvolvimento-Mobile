import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';

const ChangePasswordScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[Fonts.displaySmall, {color: Colors.onPrimaryKeyColor}]}>Change Password Screen</Text>
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

export { ChangePasswordScreen };
