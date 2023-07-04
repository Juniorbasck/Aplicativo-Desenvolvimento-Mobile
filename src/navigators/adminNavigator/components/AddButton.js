import React from 'react';
import {    
    TouchableHighlight,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const AddButton = ({onPress}) => {
    const {addButton} = styles;

    return (
        <TouchableHighlight    
            style={addButton}
            onPress={onPress}
            underlayColor={'#96c5fa'}
        >
            <Ionicons name="add-outline" size={24} color="white" />
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0077ff',
        position: 'absolute',
        left: .8 * Dimensions.get('screen').width,
        top: .75 * Dimensions.get('screen').height,
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#fffff',
        borderWidth: 1,
    },
});

export default AddButton;
