import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Colors } from '../utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchDropdown = (
    {
        state, 
        setState, 
        options,
        placeholder, 
        width=43,
        marginTop=4, 
        marginBottom=4,
        maxLength=60,
        setRef=null,
        onFocus=null,
        onChosen=null
    }
) => {
    const [elements, setElements] = useState([]);

    const renderItem = item => {
        return (
            <TouchableOpacity
                onPress={() => {
                        onChosen && onChosen();
                        setState(item.label);
                        setElements([]);
                    }
                }
                style={styles.itemContainer}
                key={item.value}
            >
                <Text>{item.label}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={[styles.container]}>
            <View 
                style={
                    [
                        styles.container, 
                        styles.textInputContainer,
                        {
                            width: width / 100 * Dimensions.get('window').width, 
                            marginBottom: marginBottom / 100 * Dimensions.get('window').height,
                            marginTop: marginTop / 100 * Dimensions.get('window').height, 
                        }
                    ]
                }
            >
                <Ionicons name='search' size={24} color={'grey'}/>
                <TextInput
                    placeholder={placeholder}
                    defaultValue={state}
                    maxLength={maxLength}
                    blurOnSubmit={false}
                    onChangeText={text => {
                            setState(text);
                            if (text) {
                                let filtered = options.filter(v => v.label.toLowerCase().includes(text.toLowerCase()));
                                setElements(filtered.slice(0, 5));
                            } else 
                                setElements([]);
                        }
                    }
                    ref={e => setRef && setRef(e)}
                    style={{flex: 1}}
                    onFocus={onFocus}
                    onSubmitEditing={() => {
                            let filtered = elements.filter(e => e.label.toLowerCase() === state.toLowerCase());
                            if (filtered.length > 0) {
                                setState(filtered[0].label);
                                onChosen && onChosen();
                            } else 
                                setState('');
                            setElements([]);
                        }
                    }
                />
            </View>
            <View
                style={
                    [
                        styles.viewList, 
                        {
                            width: width / 100 * Dimensions.get('window').width
                        },
                        elements.length > 0 ? {
                            padding: '2%',
                            margin: '2%',
                            borderWidth: 1
                        } : {}
                    ]
                }
            >
                {
                    elements.map(item => {
                        return renderItem(item);
                    })
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    textInputContainer: {
        backgroundColor: Colors.secondaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: '4%',
        paddingHorizontal: '2%',
        margin: '2%',
        flexDirection: 'row',
    },
    itemContainer: {
        margin: '2%',
        padding: '2%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryKeyColor,
    },
    viewList: {
        backgroundColor: Colors.secondaryKeyColor,
        borderRadius: 5,
        borderColors: 'black',
        position: 'absolute',
        top: 50,
    }
});

export default SearchDropdown;
