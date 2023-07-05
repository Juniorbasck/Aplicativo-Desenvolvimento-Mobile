import React, { useState, useEffect } from 'react';
import {
    Pressable,
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import YesNoAlert from '../../../components/YesNoAlert';
import CustomDropdown from '../../../components/CustomDropdown';

const IssuerInput = ({name, defaultPaymentMethod, onDelete, options}) => {
    const [nameState, setNameState] = useState(name);
    const [dpmState, setDpmState] = useState(defaultPaymentMethod);
    const [errorMsg, setErrorMsg] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [iconColor, setIconColor] = useState('black');
    
    const {
        container,
        listItem,
        errorStyle,
        dropdownStyle
    } = styles;

    const deleteIssuer = _ => {
        onDelete && onDelete(name);
        console.log('DELETE ISSUER ' + name);
    };

    return (
        <>
            <View style={container}>
                <Text style={errorStyle}>{errorMsg}</Text>
                <View style={listItem}>
                    <TextInput
                        style={{flex: 1}}
                        defaultValue={nameState}
                        onChangeText={text => {
                                if (!text.length)
                                    setErrorMsg('Não pode ser vazio')
                                else {
                                    setErrorMsg('');
                                    setNameState(text)
                                }
                            }
                        }
                        onBlur={_ => {
                                if (errorMsg) {
                                    setNameState(name);
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
                <View style={dropdownStyle}>
                    <CustomDropdown
                        state={dpmState}
                        setState={setDpmState}
                        options={options}
                        width={43}
                        marginBottom={0}
                    />
                </View>
            </View>
            <YesNoAlert
                visible={showDeleteModal}
                setVisible={setShowDeleteModal}
                title={'Excluir emissor'}
                description={`Tem certeza que desejas excluir o emissor '${name}'?`}
                onPressYes={deleteIssuer}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
    },
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
    dropdownStyle: {
        marginLeft: 0,
        justifyContent: 'center',
        margin: 15
    }
});

export default IssuerInput;
