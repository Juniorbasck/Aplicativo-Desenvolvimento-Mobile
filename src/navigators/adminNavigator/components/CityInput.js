import React, { useState } from 'react';
import {
    Pressable,
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import YesNoAlert from '../../../components/YesNoAlert';

const CityInput = ({label}) => {
    const [labelState, setLabelState] = useState(label);
    const [errorMsg, setErrorMsg] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cityToDelete, setCityToDelete] = useState();

    const [iconColor, setIconColor] = useState('black');
    
    const {
        container,
        listItem,
        errorStyle,
    } = styles;

    const deleteCity = _ => {
        console.log('DELETE CITY ' + cityToDelete);
    };

    return (
        <>
            <View style={container}>
                <Text style={errorStyle}>{errorMsg}</Text>
                <View style={listItem}>
                    <TextInput
                        style={{flex: 1}}
                        defaultValue={labelState}
                        onChangeText={text => {
                                if (!text.length)
                                    setErrorMsg('Não pode ser vazio')
                                else {
                                    setErrorMsg('');
                                    setLabelState(text)
                                }
                            }
                        }
                        onBlur={_ => {
                                if (errorMsg) {
                                    setLabelState(label);
                                    setErrorMsg('');
                                } else {
                                    console.log('SAVE TO DATABASE');
                                }
                            }
                        }
                    />
                    <Pressable 
                        onPress={_ => {
                                setCityToDelete(label);
                                setShowDeleteModal(true);
                            }
                        }
                        onPressIn={_ => setIconColor('red')}
                        onPressOut={_ => setIconColor('black')}
                    >
                        <AntDesign name="delete" size={24} color={iconColor} />
                    </Pressable>
                </View>
            </View>
            <YesNoAlert
                visible={showDeleteModal}
                setVisible={setShowDeleteModal}
                title={'Excluir cidade'}
                description={`Tem certeza que desejas excluir a cidade '${cityToDelete}'?`}
                onPressYes={deleteCity}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 5
    },
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 350,
        borderColor: 'black',
        borderWidth: .5,
        padding: 15
    },
    errorStyle: {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 10,
    },
});

export default CityInput;
