import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Colors from '../utils/Colors';
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
        onChosen=null,
        nameProp='label',
        valProp='value',
        top=50,
        wide=true
    }
) => {
    const [elements, setElements] = useState([]);

    const renderItem = item => {
        return (
            <TouchableOpacity
                onPress={() => {
                        setState(item[nameProp]);
                        setElements([]);
                        onChosen && onChosen(item[nameProp]);
                    }
                }
                style={
                    [
                        styles.itemContainer,
                        wide ? {
                            paddingVertical: '4%'
                        } : {
                            paddingVertical: '2%'
                        }
                    ]
                }
                key={item[nameProp] + '' + item[valProp]}
            >
                <Text>{item[nameProp]}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View 
                style={
                    [
                        styles.container, 
                        styles.textInputContainer,
                        {
                            width: width / 100 * Dimensions.get('window').width, 
                            marginBottom: marginBottom / 100 * Dimensions.get('window').height,
                            marginTop: marginTop / 100 * Dimensions.get('window').height, 
                        },
                        wide ? {
                            paddingVertical: '4%'
                        } : {
                            paddingVertical: '2%'
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
                                let filtered = options.filter(v => v[nameProp].toLowerCase().includes(text.toLowerCase()));
                                setElements(filtered.slice(0, 5));
                            } else 
                                setElements([]);
                        }
                    }
                    ref={e => setRef && setRef(e)}
                    style={{flex: 1}}
                    onFocus={onFocus}
                    onSubmitEditing={() => {
                            let filtered = elements.filter(e => e[nameProp].toLowerCase() === state.toLowerCase());
                            if (filtered.length > 0) {
                                setState(filtered[0][nameProp]);
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
                            width: width / 100 * Dimensions.get('window').width,
                            top: top
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
        paddingHorizontal: '2%',
        margin: '2%',
        flexDirection: 'row',
    },
    itemContainer: {
        // marginHorizontal: '2%',
        paddingHorizontal: '2%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryKeyColor,
    },
    viewList: {
        backgroundColor: Colors.secondaryKeyColor,
        borderRadius: 5,
        borderColors: 'black',
        position: 'absolute'
    }
});

export default SearchDropdown;
