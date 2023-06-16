import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';

const CustomDropdown = (
    {
        state, 
        setState, 
        options, 
        width=90, 
        marginBottom=5
    }
) => {

    const renderItem = item => {
        return (
            <View style={styles.itemContainer}>
                <Text style={Fonts.bodyLarge}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View 
            style={
                [
                    styles.container, 
                    {
                        marginBottom: marginBottom / 100 * Dimensions.get('window').height,
                    }
                ]
            }
        >
            <Dropdown
                style={{width: width / 100 * Dimensions.get('window').width}}
                data={options}
                value={state}
                placeholder='Pagamento'
                placeholderStyle={[styles.placeholder, Fonts.bodyLarge]}
                selectedTextStyle={Fonts.bodyLarge}
                labelField='label'
                valueField='value'
                onChange={item => setState(item.value)}
                maxHeight={'90%'}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        padding: '2%',
        marginRight: '5%',
        borderRadius: 5
    },
    itemContainer: {
        margin: '5%',
        padding: '2%'
    },
    placeholder: {
        color: Colors.secondaryKeyColor
    }
});

export default CustomDropdown;
