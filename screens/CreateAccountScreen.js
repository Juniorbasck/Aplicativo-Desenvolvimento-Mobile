import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    Alert
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/input/CustomTextInput';
import { TermsAndConditions } from '../components/terms_and_conditions/TermsAndConditions'; 
import { CustomButton } from '../components/button/CustomButton';

const CreateAccountScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [checked, setChecked] = useState(false);

    return (
        <KeyboardAvoidingView 
            style={styles.outerContainer}
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
        >
            <ScrollView 
                keyboardDismissMode={'on-drag'}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.marginPaddingDefault}>
                    <Text style={[Fonts.displaySmall, {color: Colors.onSecondaryKeyColor}]}>Criar Conta</Text>
                </View>
                <View style={[styles.marginPaddingDefault, {flexDirection: 'row'}]}>
                    <CustomTextInput
                        placeholder={'Nome'}
                        setState={setName}
                    />
                    <CustomTextInput
                        placeholder={'Apelido'}
                        setState={setSurname}
                    />                    
                </View>
                <View style={styles.marginPaddingDefault}>
                    <CustomTextInput
                        placeholder={'Nome de utilizador'}
                        size={'big'}
                        setState={setUsername}
                    />
                </View>
                <TermsAndConditions
                    setState={setChecked}
                />
                <View style={{marginTop: 30}}>
                    <CustomButton
                        text={'Criar'}
                        onPress={() => {
                            Alert.alert('Account created successfully!');
                        }}
                        backgroundColor={checked ? Colors.tertiaryKeyColor : Colors.tertiaryKeyColorDisabled}
                        textColor={Colors.onPrimaryKeyColor}
                        widthPercentage={95}
                        disabled={!checked}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryKeyColor
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6 / 100 * Dimensions.get('screen').height,  // 6 %
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width: Dimensions.get('screen').width,
        backgroundColor: Colors.secondaryKeyColor
    },
    marginPaddingDefault: {
        margin: 10,
        padding: 10,
    }
});

export { CreateAccountScreen };
