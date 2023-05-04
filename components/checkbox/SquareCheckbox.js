import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
} from 'react-native';
import { ResponsiveDimensions } from '../../utils/ResponsiveDimensions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../utils/Colors';

const SquareCheckbox = ({setChecked}) => {
    const [checked, toggleCheckbox] = useState(false);
    const [icon, setIcon] = useState('');

    return (
        <Pressable
            style={styles.pressable}
            onPress={() => {
                toggleCheckbox(!checked);
                if (checked) {
                    setChecked(true);
                    setIcon('checkmark');
                } else {
                    setChecked(false);
                    setIcon('');
                }
            }}
        >
            <Ionicons name={icon} size={20}/>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    pressable: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: ResponsiveDimensions.squareCheckbox.width,
        height: ResponsiveDimensions.squareCheckbox.height,
        backgroundColor: Colors.onPrimaryKeyColor
    },
    text: {
        margin: 10
    }
});

export { SquareCheckbox };
