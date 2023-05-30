import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Alert
} from 'react-native';
import { Fonts } from '../utils/Fonts';
import { Colors } from '../utils/Colors';
import { deleteExpense } from '../../service';

const ExpenseCard = props => {
    const { title, entity, price, paid, date } = props.data.item;
    const { onPress, onLongPress } = props.data;

    let backgroundColor;
    if (paid) {
        backgroundColor = Colors.onSecondaryKeyColor;
    } else {
        let difference = (new Date() - new Date(date).getTime()) / 86400000;
        if (difference < -3) {
            backgroundColor = Colors.cardGreen;
        } else if (difference < 0) {
            backgroundColor = Colors.cardYellow;
        } else {
            backgroundColor = Colors.cardRed;
        }
    }

    return (
        <Pressable
            onPress={() => onPress(props.data.item)}
            onLongPress={() => {
                Alert.alert(
                    'Deletar despesa?', 
                    'Tem certeza que deseja deletar despesa?',
                    [
                        {
                            text: 'Sim',
                            onPress: () => onLongPress(props.data.item)
                        },
                        {
                            text: 'Não',
                            style: 'cancel'
                        }
                    ]
                );
            }}
        >
            <View style={[styles.pressableContainer, {backgroundColor: backgroundColor}]}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Text style={[Fonts.bodyLarge, styles.title]} numberOfLines={2}>{title}</Text>
                    <Text style={[Fonts.bodyMedium, styles.entity]}>{entity}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={[Fonts.headlineSmall, styles.price]}>{price}€</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
        margin: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: 350
    },
    title: {
        color: Colors.onPrimaryKeyColor, 
        fontWeight: 'bold'
    },
    entity: {
        color: Colors.onPrimaryKeyColor
    },
    price: {
        color: Colors.onPrimaryKeyColor, 
        fontWeight: 'bold'
    }
});

export { ExpenseCard };
