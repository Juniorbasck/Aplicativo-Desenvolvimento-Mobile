import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { 
    stringifyOperation, 
    stringifyPaymentMethod 
} from '../service';

const HistoricItem = props => {
    const { timestamp, date, expenseTitle, entity, paymentMethod, price, paid, operation }  = props.data;

    let strOperation = stringifyOperation(operation), strPayMeth = stringifyPaymentMethod(paymentMethod);
    let splitTimestamp = timestamp.split('T');
    let preparedTimestamp = splitTimestamp[0] + ' às ' + splitTimestamp[1];

    return (
        <View style={styles.container}>
            <View style={[styles.box, {borderBottomWidth: 1}]}>
                <Text style={styles.left}>{strOperation}</Text>
                <Text style={styles.right}>{preparedTimestamp}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.left}>Vencimento:</Text>
                <Text style={styles.right}>{date}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.left}>Título:</Text>
                <Text style={styles.right}>{expenseTitle}</Text>
            </View>
             <View style={styles.box}>
                <Text style={styles.left}>Entidade:</Text>
                <Text style={styles.right}>{entity}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.left}>Preço:</Text>
                <Text style={styles.right}>{price?.toString()}€</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.left}>Método de pagamento:</Text>
                <Text style={styles.right}>{strPayMeth}</Text>
            </View> 
            <View style={styles.box}>
                <Text style={styles.left}>Pago:</Text>
                <Text style={[styles.right, paid ? {color: 'green'} : {color: 'red'}]}>{paid ? 'sim' : 'não'}</Text>
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        margin: 2,
        padding: '2%'
    },
    box: {
        flexDirection: 'row',
        padding: '2%'
    },
    left: {
        flex: 1, 
        alignItems: 'flex-start'
    },
    right: {
        flex: 1, 
        alignItems: 'flex-end'
    }
});

export { HistoricItem };
