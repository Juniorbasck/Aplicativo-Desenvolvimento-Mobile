import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import Fonts from '../utils/Fonts';

const HistoricItem = props => {
    const { timestamp, date, expenseTitle, issuer, paymentMethod, price, paid, operation }  = props.data;

    let splitTimestamp = timestamp.split('T');
    let preparedTimestamp = splitTimestamp[0] + ' às ' + splitTimestamp[1];

    return (
        <View style={styles.container}>
            <View style={[styles.box, {borderBottomWidth: 1}]}>
                <Text style={[styles.left, Fonts.bodyMedium, {fontWeight: 'bold'}]}>{operation}</Text>
                <Text style={[styles.right, Fonts.bodyMedium, {fontWeight: 'bold'}]}>{preparedTimestamp}</Text>
            </View>
            <View style={styles.box}>
                <Text style={[styles.left, Fonts.bodySmall]}>Vencimento:</Text>
                <Text style={[styles.right, Fonts.bodySmall]}>{date}</Text>
            </View>
            <View style={styles.box}>
                <Text style={[styles.left, Fonts.bodySmall]}>Título:</Text>
                <Text style={[styles.right, Fonts.bodySmall]}>{expenseTitle}</Text>
            </View>
             <View style={styles.box}>
                <Text style={[styles.left, Fonts.bodySmall]}>Emissor:</Text>
                <Text style={[styles.right, Fonts.bodySmall]}>{issuer}</Text>
            </View>
            <View style={styles.box}>
                <Text style={[styles.left, Fonts.bodySmall]}>Preço:</Text>
                <Text style={[styles.right, Fonts.bodySmall]}>{price?.toString()}€</Text>
            </View>
            <View style={styles.box}>
                <Text style={[styles.left, Fonts.bodySmall]}>Método de pagamento:</Text>
                <Text style={[styles.right, Fonts.bodySmall]}>{paymentMethod}</Text>
            </View> 
            <View style={styles.box}>
                <Text style={[styles.left, Fonts.bodySmall]}>Pago:</Text>
                <Text style={[styles.right, Fonts.bodySmall, paid ? {color: 'green'} : {color: 'red'}]}>{paid ? 'sim' : 'não'}</Text>
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

export default HistoricItem;
