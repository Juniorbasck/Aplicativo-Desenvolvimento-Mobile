import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import SearchDropdown from './SearchDropdown';
import CustomTextInput from './CustomTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIssuersAsync, selectIssuers } from '../features/issuers/issuersSlice';

const IssuerInput = (
    {
        state,
        setState,
        width=90,
        marginTop=4,
        marginBottom=4,
        onFocusSearchDropdown=null,
        onChosenSearchDropDown=null,
        setRef=null,
        onTextInputSubmitEditing=null,
        person=true,
        onPress=null
    }
) => {
    const [colorLeft, setColorLeft] = useState(person ? 'black' : 'white');
    const [colorRight, setColorRight] = useState(person ? 'white' : 'black');

    const issuers = useAppSelector(selectIssuers);
    const issuersState = useAppSelector(state => state.issuers.status);

    const dispatch = useAppDispatch();

    const renderPersonInput = _ => colorLeft === 'black';

    const renderCompanyInput = _ => colorRight === 'black';

    useEffect(() => {
        dispatch(setIssuersAsync());
    }, []);

    if (issuersState === 'loading')
        return (
            <CustomTextInput
                state={state}
                setState={setState}
                width={width}
                marginTop={marginTop}
                marginBottom={marginBottom}
                placeholder='Emissor'
                setRef={setRef}
                onSubmitEditing={onTextInputSubmitEditing}
                blurOnSubmit={false}
            />
        );

    return (
        <>
            <Pressable
                style={styles.pressable}
                onPress={() => {
                        let auxLeft = colorLeft;
                        setColorLeft(colorRight);
                        setColorRight(auxLeft);
                        onPress && onPress();
                    }
                }
            >
                <Text>Pessoa</Text>
                <View style={styles.iconContainer}>
                    <Ionicons name='caret-back' size={24} color={colorLeft}/>
                    <Ionicons name='caret-forward' size={24} color={colorRight}/>
                </View>
                <Text>Empresa</Text>
            </Pressable>
            {
                renderPersonInput() && (
                    <CustomTextInput
                        state={state}
                        setState={setState}
                        width={width}
                        marginTop={marginTop}
                        marginBottom={marginBottom}
                        placeholder='Emissor'
                        setRef={setRef}
                        onSubmitEditing={onTextInputSubmitEditing}
                        blurOnSubmit={false}
                    />
                )
            }
            {
                renderCompanyInput() && (
                    <SearchDropdown
                        state={state}
                        setState={setState}
                        options={issuers.value}
                        placeholder={'Emissor'}
                        width={width}
                        marginTop={marginTop}
                        marginBottom={marginBottom}
                        maxLength={60}
                        nameProp='name'
                        valProp='defaultPaymentMethod'
                        top={50}
                        wide={false}
                        onFocus={onFocusSearchDropdown}
                        onChosen={onChosenSearchDropDown}
                        setRef={setRef}
                    />
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        marginHorizontal: '2%',
        paddingHorizontal: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pressable: {
        marginVertical: '2%', 
        flexDirection: 'row'
    }
});

export default IssuerInput;