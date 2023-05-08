import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';

const ProfileScreen = ({navigation}) => {
    return (
        <View style={styles.outerContainer}>
            <Text style={[Fonts.bodyLarge, {color: Colors.onPrimaryKeyColor}]}>Profile Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export { ProfileScreen };
