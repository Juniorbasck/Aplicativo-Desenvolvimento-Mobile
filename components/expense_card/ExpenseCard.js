import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Alert,
    Modal
} from 'react-native';
import { Fonts } from '../../utils/Fonts';
import { Colors } from '../../utils/Colors';

const ExpenseCard = props => {
    const {title, entity, price, dueDate, paid, callback} = props.data.item;
    let backgroundColor;
    if (paid) {
        backgroundColor = Colors.onSecondaryKeyColor;
    } else {
        let difference = (new Date() - new Date(dueDate).getTime()) / 86400000;
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
            onPress={callback}
        >
            <View style={[styles.pressableContainer, {backgroundColor: backgroundColor}]}>
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={[Fonts.bodyLarge, styles.title]}>{title}</Text>
                    <Text style={[Fonts.bodyMedium, styles.entity]}>{entity}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
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
        borderRadius: 10
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
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryKeyColor,
        margin: 20
    }
});

export { ExpenseCard };
