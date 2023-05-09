import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { getExpenses } from '../service';

const ExpenseScreen = ({navigation}) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getExpenses(setExpenses);
    }, []);

    return (
        <View style={styles.outerContainer}>
            <Text style={[Fonts.bodyLarge, {color: Colors.onPrimaryKeyColor}]}>Expense Screen</Text>
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

export { ExpenseScreen };
