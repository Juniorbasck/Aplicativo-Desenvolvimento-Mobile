import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import Colors from '../../../utils/Colors';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import YesNoAlert from '../../../components/YesNoAlert';
import OkAlert from '../../../components/OkAlert';
import ProfilePicture from '../../../components/ProfilePicture';
import PickImageModal from '../../../components/PickImageModal';
import SearchDropdown from '../../../components/SearchDropdown';
import CustomDatePicker from '../../../components/CustomDatePicker';
import PostalCodeInput from '../../../components/PostalCodeInput';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { updateUserAsync } from '../../../../service';
import {
    useAppSelector,
    useAppDispatch
} from '../../../app/hooks';
import {
    selectUserData,
    setUserDataAsync
} from '../../../features/userData/userDataSlice';
import { selectCities, setCitiesAsync } from '../../../features/cities/citiesSlice';
import { selectUserMinAge, setUserMinAgeAsync } from '../../../features/userMinAge/userMinAgeSlice';
import { validateUserData } from '../../../utils/Validator';

function dataChanged(
    userData, 
    name, 
    surname, 
    username, 
    birthdayDate, 
    street, 
    city, 
    postcode, 
    image
) {
    return (
        userData.value.name != name || userData.value.surname != surname || 
        userData.value.username != username || userData.value.image != image ||
        userData.value.birthdayDate != birthdayDate || userData.value.street != street ||
        userData.value.city != city || userData.value.postcode != postcode
    );
}

const ProfileDetailsScreen = ({navigation}) => {
    const userData = useAppSelector(selectUserData);
    const userDataStatus = useAppSelector(state => state.userData.status);

    const cities = useAppSelector(selectCities);
    const citiesStatus = useAppSelector(state => state.cities.status);

    const userMinAge = useAppSelector(selectUserMinAge);
    const userMinAgeStatus = useAppSelector(state => state.userMinAge.status);

    const dispatch = useAppDispatch();

    const [name, setName] = useState(userData?.value.name);
    const [surname, setSurname] = useState(userData?.value.surname);
    const [username, setUsername] = useState(userData?.value.username);
    const [date, setDate] = useState(userData?.value.birthdayDate);
    const [street, setStreet] = useState(userData?.value.street);
    const [city, setCity] = useState(userData?.value.city);
    const [postalCode, setPostalCode] = useState(userData?.value.postcode);
    const [email, setEmail] = useState(userData?.value.email);
    const [image, setImage] = useState(userData?.value.image);

    const [modalVisible, setModalVisible] = useState(false);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [updateDataAlertVisible, setUpdateDataAlertVisible] = useState(false);
    const [invalidDataAlertVisible, setInvalidDataAlertVisible] = useState(false);

    const [nameInput, setNameInput] = useState();
    const [surnameInput, setSurnameInput] = useState();
    const [usernameInput, setUsernameInput] = useState();
    const [cityInput, setCityInput] = useState();
    const [postalCodeInput, setPostalCodeInput] = useState();

    const [action, setAction] = useState({});
    const [invalidDataTitle, setInvalidDataTitle] = useState('');
    const [invalidDataMsg, setInvalidDataMsg] = useState('');

    const [pullBack, setPullBack] = useState(false);

    const [modalOpenState, setModalOpenState] = useState(false);

    const getTrimmed = () => {
        return {
            name: name.trim(),
            username: username.trim(),
            surname: surname.trim(),
            street: street.trim(),
            city: city.trim(),
            postcode: postalCode.trim()
        };
    };

    const update = async _ => {
        let trimmedData = getTrimmed();
        let res = await validateUserData(
            trimmedData?.name,
            trimmedData?.surname,
            trimmedData?.username,
            date,
            trimmedData?.street,
            trimmedData?.city,
            trimmedData?.postcode,
            userData?.value.email,
            userMinAge?.value,
            cities?.value,
            postcodeType,
            userData.value.id
        );
        if (res.header === 'ok') {
            if (
                dataChanged(
                    userData,
                    trimmedData?.name,
                    trimmedData?.surname,
                    trimmedData?.username,
                    date,
                    trimmedData?.street,
                    trimmedData?.city,
                    trimmedData?.postcode,
                    image
                )
            ) {
                let newUserData = {
                    ...trimmedData,
                    birthdayDate: date,
                    image: image
                };
                try {
                    await updateUserAsync(newUserData);
                    dispatch(setUserDataAsync());
                } catch (err) {
                    setUpdateDataAlertVisible(false);
                    setInvalidDataMsg(err.message);
                    setInvalidDataAlertVisible(true);
                    return false;
                } 
            }
            return true;
        } else {
            setUpdateDataAlertVisible(false);
            setInvalidDataTitle(res.header);
            setInvalidDataMsg(res.body);
            setInvalidDataAlertVisible(true);
            return false;
        }
    };

    const onUpdate = async () => {
        let updateStatus = await update();
        if (updateStatus) 
            navigation.navigate('Profile', {
                changed: true
            });
    };

    useEffect(() => {
        dispatch(setUserDataAsync());
        dispatch(setCitiesAsync());
        dispatch(setUserMinAgeAsync());
    }, []);

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            let trimmedData = getTrimmed();
            if (
                e.data.action.type === 'POP' && 
                dataChanged(
                    userData,
                    trimmedData?.name,
                    trimmedData?.surname,
                    trimmedData?.username,
                    date,
                    trimmedData?.street,
                    trimmedData?.city,
                    trimmedData?.postcode,
                    image
                )
            ) {
                e.preventDefault();
                setAction(e.data.action);
                setUpdateDataAlertVisible(true);
            }
        });
    }, [navigation, name, surname, username, date, street, city, postalCode, image]);

    const postcodeType = [4, 3];

    const {
        outerContainer,
        scrollView,
        topLabel,
        softView,
        superTopLabel,
        addressRowView,
    } = styles;

    if (
        userDataStatus === 'loading' || 
        citiesStatus === 'loading' ||
        userMinAgeStatus === 'loading'
    )
        return <LoadingIndicator/>
        
    return (
        <View style={outerContainer}>
            <ScrollView 
                contentContainerStyle={scrollView}
                keyboardDismissMode='on-drag'
            >   
                <View style={{marginTop: '5%'}}>
                    <ProfilePicture
                        onPress={() => setModalVisible(true)}
                        size='big'
                        src={image}
                    />
                </View>
                <Text style={topLabel}>Nome</Text>
                <CustomTextInput
                    state={name}
                    setState={setName}
                    placeholder='Nome'
                    width={90}
                    marginTop={0}
                    marginBottom={3}
                    autofocus={true}
                    setRef={setNameInput}
                    onSubmitEditing={() => surnameInput.focus()}
                    blurOnSubmit={false}
                />
                <Text style={topLabel}>Apelido</Text>
                <CustomTextInput
                    state={surname}
                    setState={setSurname}
                    placeholder='Apelido'
                    width={90}
                    marginTop={0}
                    marginBottom={3}
                    setRef={setSurnameInput}
                    onSubmitEditing={() => usernameInput.focus()}
                    blurOnSubmit={false}
                />
                <Text style={topLabel}>Nome de Utilizador</Text>
                <CustomTextInput
                    state={username}
                    setState={setUsername}
                    placeholder='Nome de Utilizador'
                    width={90}
                    marginTop={0}
                    marginBottom={3}
                    setRef={setUsernameInput}
                />
                <Text style={topLabel}>Data de Nascimento</Text>
                <CustomDatePicker
                    state={date}
                    setState={setDate}
                    width={90}
                    marginTop={0}
                    marginBottom={3}
                    modalOpenState={modalOpenState}
                    setModalOpenState={setModalOpenState}
                />
                <View style={softView}>
                    <Text style={[superTopLabel, {fontWeight: 'bold'}]}>Endereço</Text>
                    <View style={addressRowView}>
                        <View style={softView}>
                            <Text style={topLabel}>Logradouro</Text>
                            <CustomTextInput
                                placeholder='Logradouro'
                                width={43}
                                marginTop={0}
                                marginBottom={3}
                                state={street}
                                setState={setStreet}
                                maxLength={100}
                                onSubmitEditing={() => cityInput.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={softView}>
                            <Text style={topLabel}>Cidade</Text>
                            <SearchDropdown
                                state={city}
                                setState={setCity}
                                placeholder={'Cidade'}
                                marginTop={0}
                                marginBottom={3}
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
                        <Text style={superTopLabel}>Código Postal</Text>
                        <PostalCodeInput
                            code={postalCode}
                            setCode={setPostalCode}
                            setRef={setPostalCodeInput}
                            width={43}
                            marginTop={0}
                            marginBottom={3}
                            type={postcodeType}  // xxxx-xxx
                            placeholder={'Código Postal'}
                        />
                    </View>
                </View>
                <Text style={topLabel}>E-mail</Text>
                <CustomTextInput
                    state={email}
                    setState={setEmail}
                    placeholder='E-mail'
                    width={90}
                    marginTop={0}
                    marginBottom={4}
                    editable={false}
                    pullBack={pullBack}
                />
                <CustomButton
                    text={'Guardar'}
                    onPress={onUpdate}
                    backgroundColor={Colors.primaryKeyColor}
                    textColor={Colors.onPrimaryKeyColor}
                    widthPercentage={84}
                />
            </ScrollView>
            <YesNoAlert
                visible={updateDataAlertVisible}
                setVisible={setUpdateDataAlertVisible}
                title={'Detalhes da Conta'}
                description={'Desejas salvar as alterações?'}
                onPressYes={onUpdate}
                onPressNo={() => navigation.dispatch(action)}
            />
            <OkAlert
                visible={invalidDataAlertVisible}
                setVisible={setInvalidDataAlertVisible}
                title={invalidDataTitle}
                description={invalidDataMsg}
            />
            <PickImageModal
                state={modalVisible}
                setState={setModalVisible}
                image={image}
                setImage={setImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
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
    rowContainer: {
        flexDirection: 'row'
    },
    paymentMethod: {
        textAlign: 'center',
    },
    image: {
        alignSelf: 'center',
        width: .9 * Dimensions.get('window').width,
        height: .3 * Dimensions.get('window').height,
        marginBottom: '8%'
    },
    topLabel: {
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: '2%'
    },
    superTopLabel: {
        marginLeft: '2%', 
        alignSelf: 'flex-start', 
        marginBottom: '2%'
    },
    softView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    addressRowView: {
        flexDirection: 'row',
    },
});

export default ProfileDetailsScreen;
