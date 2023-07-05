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

const DeletableInput = ({label, onDelete}) => {
    const [labelState, setLabelState] = useState(label);
    const [errorMsg, setErrorMsg] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [iconColor, setIconColor] = useState('black');
    
    const {
        listItem,
        errorStyle,
    } = styles;

    const deleteItem = _ => {
        onDelete && onDelete(label);
        console.log('DELETE ' + label);
    };

    return (
        <>
            <View>
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
                title={'Excluir'}
                description={`Tem certeza que desejas excluir '${label}'?`}
                onPressYes={deleteItem}
            />
        </>
    );
};

const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 350,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5
    },
    errorStyle: {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 10,
    },
});

export default DeletableInput;
