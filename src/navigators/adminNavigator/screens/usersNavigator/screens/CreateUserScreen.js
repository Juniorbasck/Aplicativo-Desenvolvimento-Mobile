import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    Switch
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectCities, setCitiesAsync } from '../../../../../features/cities/citiesSlice';
import CustomTextInput from '../../../../../components/CustomTextInput';
import CustomDatePicker from '../../../../../components/CustomDatePicker';
import SearchDropdown from '../../../../../components/SearchDropdown';
import PostalCodeInput from '../../../../../components/PostalCodeInput';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import ProfilePicture from '../../../../../components/ProfilePicture';
import PickImageModal from '../../../../../components/PickImageModal';
import AdminButton from '../../../components/AdminButton';
import PasswordInput from '../../../../../components/PasswordInput';

const CreateUserScreen = ({route, navigation}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [image, setImage] = useState();

    const [pullBack, setPullBack] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [surnameInput, setSurnameInput] = useState();
    const [usernameInput, setUsernameInput] = useState();
    const [cityInput, setCityInput] = useState();
    const [postalCodeInput, setPostalCodeInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [passwordRepeatInput, setPasswordRepeatInput] = useState();

    const [adminUser, setAdminUser] = useState(false);

    const cities = useAppSelector(selectCities);
    const citiesStatus = useAppSelector(status => status.cities.status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCitiesAsync());
    }, []);

    useEffect(() => navigation.addListener('beforeRemove', e => {
    }), [navigation]);

    const create = async _ => {
        return true;
    };

    const onCreate = async _ => {
        let createStatus = await create();
        if (createStatus) 
            navigation.navigate('Users', {
                created: true
            });
    };

    const {
        outerContainer,
        innerContainer,
        topLabel,
        softView,
        rowContainer,
        bold
    } = styles;

    if (citiesStatus === 'loading')
        return <LoadingIndicator/>

    const postcodeType = [4, 3];

    return (
        <View style={outerContainer}>
            <ScrollView
                contentContainerStyle={
                    [
                        innerContainer, 
                        !adminUser ? {
                            height: Dimensions.get('window').height * 1.5
                        } : {}
                    ]
                }
                keyboardDismissMode='on-drag'
            >
                <Text style={[topLabel, bold]}>Tipo de Utilizador</Text>
                <View style={[rowContainer, softView]}>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center'}}>Comum</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Switch
                            value={adminUser}
                            onValueChange={admin => {
                                    setAdminUser(admin);
                                    if (admin)
                                        emailInput.focus();
                                }
                            }
                            thumbColor={'#0077ff'}
                            trackColor={'#0077ff'}
                            ios_backgroundColor={'#0077ff'}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center'}}>Administrador</Text>
                    </View>
                </View>
                {
                    !adminUser &&
                    (
                        <>
                            <View style={{marginTop: '5%'}}>
                                <ProfilePicture
                                    onPress={() => setModalVisible(true)}
                                    size='big'
                                    src={image}
                                />
                            </View>
                            <Text style={[topLabel, bold]}>Nome</Text>
                            <CustomTextInput
                                state={name}
                                setState={setName}
                                placeholder='Nome'
                                backgroundColor={'white'}
                                autofocus={true}
                                marginTop={1}
                                onSubmitEditing={_ => surnameInput.focus()}
                                blurOnSubmit={false}
                            />
                            <Text style={[topLabel, bold]}>Apelido</Text>
                            <CustomTextInput
                                state={surname}
                                setState={setSurname}
                                placeholder='Apelido'
                                backgroundColor={'white'}
                                marginTop={1}
                                setRef={setSurnameInput}
                                onSubmitEditing={_ => usernameInput.focus()}
                                blurOnSubmit={false}
                            />
                            <Text style={[topLabel, bold]}>Nome de Utilizador</Text>
                            <CustomTextInput
                                state={username}
                                setState={setUsername}
                                placeholder='Nome de Utilizador'
                                backgroundColor={'white'}
                                marginTop={1}
                                setRef={setUsernameInput}
                            />
                            <Text style={[topLabel, bold]}>Data de Nascimento</Text>
                            <CustomDatePicker
                                state={birthday}
                                setState={setBirthday}
                                marginTop={1}
                            />
                            <Text style={[topLabel, bold]}>Endereço</Text>
                            <View>
                                <View style={[rowContainer, {marginTop: '2%'}]}>
                                    <View style={softView}>
                                        <Text style={topLabel}>Logradouro</Text>
                                        <CustomTextInput
                                            placeholder='Logradouro'
                                            width={43}
                                            marginTop={1}
                                            state={street}
                                            setState={setStreet}
                                            maxLength={100}
                                            onSubmitEditing={() => cityInput.focus()}
                                            blurOnSubmit={false}
                                            backgroundColor={'white'}
                                        />
                                    </View>
                                    <View style={softView}>
                                        <Text style={topLabel}>Cidade</Text>
                                        <SearchDropdown
                                            state={city}
                                            setState={setCity}
                                            placeholder={'Cidade'}
                                            marginTop={1}
                                            marginBottom={2}
                                            options={cities.value}
                                            onFocus={() => setPullBack(true)}
                                            onChosen={() => {
                                                    setPullBack(false);
                                                    postalCodeInput.focus();
                                                }
                                            }
                                            setRef={setCityInput}
                                            backgroundColor={'white'}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                </View>
                                <Text style={[topLabel, {marginLeft: '2%'}]}>Código Postal</Text>
                                <PostalCodeInput
                                    code={postalCode}
                                    setCode={setPostalCode}
                                    setRef={setPostalCodeInput}
                                    width={43}
                                    marginTop={1}
                                    type={postcodeType}  // xxxx-xxx
                                    placeholder={'Código Postal'}
                                    backgroundColor={'white'}
                                    onSubmitEditing={_ => emailInput.focus()}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </>
                    )
                }
                <Text style={[topLabel, bold]}>E-mail</Text>
                <CustomTextInput
                    state={email}
                    setState={setEmail}
                    placeholder='E-mail'
                    keyboardType='email-address'
                    width={90}
                    marginTop={1}
                    backgroundColor={'white'}
                    pullBack={pullBack}
                    setRef={setEmailInput}
                    onSubmitEditing={_ => passwordInput.focus()}
                    blurOnSubmit={false}
                />
                <Text style={[topLabel, bold]}>Palavra-Passe</Text>
                <PasswordInput
                    state={password}
                    setState={setPassword}
                    marginTop={1}
                    backgroundColor={'white'}
                    setRef={setPasswordInput}
                    onSubmitEditing={_ => passwordRepeatInput.focus()}
                    blurOnSubmit={false}
                />
                <Text style={[topLabel, bold]}>Repetir Palavra-Passe</Text>
                <PasswordInput
                    state={passwordRepeat}
                    setState={setPasswordRepeat}
                    marginTop={1}
                    marginBottom={3}
                    backgroundColor={'white'}
                    placeholder='Repetir Palavra-Passe'
                    setRef={setPasswordRepeatInput}
                />
                <View style={{width: 370}}>
                    <AdminButton 
                        text={'Criar'}
                        onPress={onCreate}
                    />
                </View>
            </ScrollView>
            <PickImageModal
                state={modalVisible}
                setState={setModalVisible}
                image={image}
                setImage={setImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        marginTop: '5%',
        width: Dimensions.get('window').width,
    },
    topLabel: {
        alignSelf: 'flex-start',
        marginLeft: '5%',
    },
    softView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default CreateUserScreen;
