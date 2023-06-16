import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import { Colors } from '../../../utils/Colors';
import { CustomTextInput } from '../../../components/CustomTextInput';
import { TermsAndConditions } from '../../../components/TermsAndConditions'; 
import { CustomButton } from '../../../components/CustomButton';
import { validateUserData } from '../../../utils/Validator';
import { PasswordInput } from '../../../components/PasswordInput';
import { createNewUserAsync } from '../../../../service';
import { OkAlert } from '../../../components/OkAlert';
import { YesNoAlert } from '../../../components/YesNoAlert';
import {
    createUserWithEmailAndPassword, 
    getAuth,
    sendEmailVerification
} from 'firebase/auth';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { CustomDatePicker } from '../../../components/CustomDatePicker';
import { isValidBirthdayDate, getValidBirthdayDate } from '../../../utils/Date';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCities, setCitiesAsync } from '../../../features/cities/citiesSlice';
import { selectUserMinAge, setUserMinAgeAsync } from '../../../features/userMinAge/userMinAgeSlice';
import SearchDropdown from '../../../components/SearchDropdown';
import PostalCodeInput from '../../../components/PostalCodeInput';



const CreateAccountScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [date, setDate] = useState();
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [modalOpenState, setModalOpenState] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const [nameInput, setNameInput] = useState();
    const [surnameInput, setSurnameInput] = useState();
    const [usernameInput, setUsernameInput] = useState();
    const [cityInput, setCityInput] = useState();
    const [postalCodeInput, setPostalCodeInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [confirmPasswordInput, setConfirmPasswordInput] = useState();

    const [avoidUseEffect, setAvoidUseEffect] = useState(false);

    const [errorOkAlertVisible, setErrorOkAlertVisible] = useState(false);
    const [errorOkAlertTitle, setErrorOkAlertTitle] = useState('');
    const [errorOkAlertDescription, setErrorOkAlertDescription] = useState('');

    const [yesNoAlertVisible, setYesNoAlertVisible] = useState(false);
    const [action, setAction] = useState();

    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('');

    const cities = useAppSelector(selectCities);
    const citiesStatus = useAppSelector(state => state.cities.status);

    const userMinAge = useAppSelector(selectUserMinAge);
    const userMinAgeStatus = useAppSelector(state => state.userMinAge.status);

    const [pullBack, setPullBack] = useState(false);

    const dispatch = useAppDispatch();

    const postcodeType = [4, 3];

    useEffect(() => {
        dispatch(setUserMinAgeAsync());
        dispatch(setCitiesAsync());
    }, []);

    useEffect(() => {
        if (userMinAge?.value)
            setDate(getValidBirthdayDate(userMinAge.value));
    }, [userMinAge]);

    useEffect(() => navigation.addListener('beforeRemove', e => {
        let action = e.data.action;
        if (!avoidUseEffect) {
            e.preventDefault();
            setAction(action);
            setYesNoAlertVisible(true);
        }
    }), [navigation, avoidUseEffect]);


    return loading || citiesStatus === 'loading' || userMinAgeStatus === 'loading' ? (
        <LoadingIndicator loadingMessage={loadingMsg}/>
    ) : (
        <View style={styles.outerContainer}>
            <ScrollView 
                keyboardDismissMode={'on-drag'}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.nameSurnameContainer}>
                    <View style={styles.softView}>
                        <Text style={styles.topLabel}>Nome</Text>
                        <CustomTextInput
                            placeholder={'Nome'}
                            marginTopPercentage={0}
                            state={name}
                            setState={setName}
                            autofocus={true}
                            setRef={setNameInput}
                            onSubmitEditing={() => surnameInput.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.softView}>
                        <Text style={styles.topLabel}>Apelido</Text>
                        <CustomTextInput
                            placeholder='Apelido'
                            marginTopPercentage={0}
                            state={surname}
                            setState={setSurname}
                            setRef={setSurnameInput}
                            onSubmitEditing={() => usernameInput.focus()}
                            blurOnSubmit={false}
                        />                   
                    </View> 
                </View>
                <Text style={styles.topLabel}>Nome de Utilizador</Text>
                <CustomTextInput
                    placeholder={'Nome de utilizador'}
                    marginTopPercentage={0}
                    widthPercentage={90}
                    state={username}
                    setState={setUsername}
                    marginBottomPercentage={4}
                    setRef={setUsernameInput}
                />
                <Text style={styles.topLabel}>Data de Nascimento</Text>
                <CustomDatePicker
                    state={date}
                    setState={setDate}
                    widthPercentage={90}
                    marginBottomPercentage={3}
                    modalOpenState={modalOpenState}
                    setModalOpenState={setModalOpenState}
                />
                <View style={styles.softView}>
                    <Text style={styles.superTopLabel}>Endereço</Text>
                    <View style={styles.addressRowView}>
                        <View style={styles.softView}>
                            <Text style={styles.topLabel}>Logradouro</Text>
                            <CustomTextInput
                                placeholder='Logradouro'
                                marginTopPercentage={0}
                                state={street}
                                setState={setStreet}
                                marginBottomPercentage={4}
                                maxLength={100}
                                onSubmitEditing={() => cityInput.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.softView}>
                            <Text style={styles.topLabel}>Cidade</Text>
                            <SearchDropdown
                                state={city}
                                setState={setCity}
                                placeholder={'Cidade'}
                                marginTop={0}
                                options={cities.value}
                                onFocus={() => setPullBack(true)}
                                onChosen={() => {
                                        setPullBack(false);
                                        postalCodeInput.focus();
                                    }
                                }
                                setRef={setCityInput}
                            />
                        </View>
                    </View>
                    <View style={{alignSelf: 'flex-start'}}>
                        <Text style={styles.postalCode}>Código Postal</Text>
                        <PostalCodeInput
                            data={
                                {
                                    code: postalCode, 
                                    setCode: setPostalCode,
                                    setRef: setPostalCodeInput,
                                    width: 43, 
                                    marginTop: 0, 
                                    marginBottom: 4,
                                    type: postcodeType,  // xxxx-xxx
                                    placeholder: 'Código Postal',
                                }
                            }
                        />
                    </View>
                </View>
                <Text style={styles.topLabel}>E-mail</Text>
                <CustomTextInput
                    placeholder={'E-mail'}
                    widthPercentage={90}
                    marginTopPercentage={0}
                    state={email}
                    setState={setEmail}
                    keyboardType={'email-address'}
                    marginBottomPercentage={4}
                    setRef={setEmailInput}
                    onSubmitEditing={() => passwordInput.focus()}
                    blurOnSubmit={false}
                    maxLength={60}
                    pullBack={pullBack}
                />
                <Text style={styles.topLabel}>Palavra-Passe</Text>
                <PasswordInput
                    state={password}
                    setState={setPassword}
                    widthPercentage={90}
                    marginBottomPercentage={4}
                    marginTopPercentage={0}
                    setRef={setPasswordInput}
                    onSubmitEditing={() => confirmPasswordInput.focus()}
                    blurOnSubmit={false}
                    pullBack={pullBack}
                />
                <Text style={styles.topLabel}>Repita Palavra-Passe</Text>
                <PasswordInput
                    state={confirmPassword}
                    setState={setConfirmPassword}
                    widthPercentage={90}
                    marginBottomPercentage={4}
                    marginTopPercentage={0}
                    placeholder='Confirmar palavra-passe'
                    setRef={setConfirmPasswordInput}
                    pullBack={pullBack}
                />
                <TermsAndConditions
                    state={checked}
                    setState={setChecked}
                />
                <View style={{marginTop: '5%'}}>
                    <CustomButton
                        text={'Criar'}
                        onPress={async () => {
                            let localName = name.trim(), 
                                localSurname = surname.trim(), 
                                localUsername = username.trim(),
                                localStreet = street.trim(),
                                localCity = city.trim(),
                                localPostcode = postalCode.trim(),
                                localEmail = email.trim(),
                                localPassword = password.trim(),
                                localConfirmPassword = confirmPassword.trim();
                            let res = await validateUserData(
                                localName, 
                                localSurname, 
                                localUsername, 
                                date, 
                                localStreet,
                                localCity,
                                localPostcode,
                                localEmail, 
                                localPassword, 
                                localConfirmPassword,
                                userMinAge.value,
                                cities.value,
                                postcodeType
                            );
                            if (res.header == 'Validação de E-mail') {
                                setAvoidUseEffect(true);
                                setLoadingMsg('Criando conta...');
                                setLoading(true);
                                let auth = getAuth();
                                await createUserWithEmailAndPassword(auth, localEmail, localPassword)
                                .then(_ => {
                                    sendEmailVerification(
                                        auth.currentUser, {
                                        handleCodeInApp: true,
                                        url: 'https://meu-controlo-financeiro.firebaseapp.com'
                                    }).then(async _ => {
                                        await createNewUserAsync(
                                            localName, 
                                            localSurname, 
                                            localUsername, 
                                            date, 
                                            localStreet,
                                            localCity,
                                            localPostcode,
                                            localEmail
                                        );
                                        setLoading(false);
                                        setLoadingMsg('');
                                        navigation.navigate('Login', {
                                            email: email
                                        });
                                    }).catch(err => {
                                        setErrorOkAlertTitle('Erro ao Tentar Criar Conta');
                                        setErrorOkAlertDescription(err.message);
                                        setErrorOkAlertVisible(true);
                                    });
                                }).catch(err => {
                                    setErrorOkAlertTitle('Erro ao Tentar Criar Conta');
                                    setErrorOkAlertDescription(err.message);
                                    setErrorOkAlertVisible(true);
                                });
                            } else {
                                setErrorOkAlertTitle(res.header);
                                setErrorOkAlertDescription(res.body);
                                setErrorOkAlertVisible(true);
                            }
                        }}
                        backgroundColor={checked ? Colors.tertiaryKeyColor : Colors.tertiaryKeyColorDisabled}
                        textColor={Colors.onPrimaryKeyColor}
                        widthPercentage={95}
                        disabled={!checked}
                    />
                </View>
            </ScrollView>
            <OkAlert
                visible={errorOkAlertVisible}
                setVisible={setErrorOkAlertVisible}
                title={errorOkAlertTitle}
                description={errorOkAlertDescription}
            />
            <YesNoAlert
                visible={yesNoAlertVisible}
                setVisible={setYesNoAlertVisible}
                title={'Criação de Conta'}
                description={'Se voltares os dados serão perdidos. Desejas realmente fazer isso?'}
                onPressYes={() => navigation.dispatch(action)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryKeyColor,
    },
    scrollView: {
        height: Dimensions.get('window').height * 1.3,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginTop: '5%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: Colors.secondaryKeyColor
    },
    nameSurnameContainer: {
        flexDirection: 'row', 
        marginTop: '10%',
        marginBottom: '2%'
    },
    topLabel: {
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: '2%'
    },
    superTopLabel: {
        marginLeft: '3%', 
        alignSelf: 'flex-start', 
        fontWeight: 'bold', 
        marginBottom: '2%'
    },
    softView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    addressRowView: {
        flexDirection: 'row',
        marginLeft: '1%'
    },
    postalCode: {
        marginLeft: '2%', 
        marginBottom: '2%'
    }
});

export { CreateAccountScreen };
