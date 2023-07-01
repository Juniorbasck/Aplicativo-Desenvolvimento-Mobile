import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions
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

const UserDetailsScreen = ({route, navigation}) => {
    const { user } = route.params;

    const [name, setName] = useState(user?.name);
    const [surname, setSurname] = useState(user?.surname);
    const [username, setUsername] = useState(user?.username);
    const [birthday, setBirthday] = useState(user?.birthdayDate);
    const [street, setStreet] = useState(user?.street);
    const [city, setCity] = useState(user?.city);
    const [postalCode, setPostalCode] = useState(user?.postcode);
    const [email, setEmail] = useState(user?.email);
    // const [image, setImage] = useState(user?.image);
    const [image, setImage] = useState({uri: 'https://firebasestorage.googleapis.com/v0/b/meu-controlo-financeiro.appspot.com/o/users%2Frowstmail%40gmail.com%2Fimages%2Fprofile%2Fprofile.jpeg?alt=media&token=bfdb9e67-855a-4c80-b1c5-ceb2aa3cc9ca'});

    const [pullBack, setPullBack] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const cities = useAppSelector(selectCities);
    const citiesStatus = useAppSelector(status => status.cities.status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCitiesAsync());
    }, []);

    useEffect(() => navigation.addListener('beforeRemove', e => {
    }), [navigation]);

    const update = async _ => {
        return true;
    };

    const onUpdate = async _ => {
        let updateStatus = await update();
        if (updateStatus) 
            navigation.navigate('Users', {
                changed: true
            });
    };

    const changePassword = _ => {};

    const {
        outerContainer,
        innerContainer,
        topLabel,
        softView,
        rowContainer,
        underlined,
        bottomButtonsContainer
    } = styles;

    if (citiesStatus === 'loading')
        return <LoadingIndicator/>

    const postcodeType = [4, 3];

    return (
        <View style={outerContainer}>
            <ScrollView
                contentContainerStyle={innerContainer}
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
                    backgroundColor={'white'}
                    autofocus={true}
                    marginTop={1}
                />
                <Text style={topLabel}>Apelido</Text>
                <CustomTextInput
                    state={surname}
                    setState={setSurname}
                    placeholder='Apelido'
                    backgroundColor={'white'}
                    marginTop={1}
                />
                <Text style={topLabel}>Nome de Utilizador</Text>
                <CustomTextInput
                    state={username}
                    setState={setUsername}
                    placeholder='Nome de Utilizador'
                    backgroundColor={'white'}
                    marginTop={1}
                />
                <Text style={topLabel}>Data de Nascimento</Text>
                <CustomDatePicker
                    state={birthday}
                    setState={setBirthday}
                    marginTop={1}
                />
                <Text style={[topLabel, {fontWeight: 'bold'}]}>Endereço</Text>
                <View style={{marginLeft: '5%'}}>
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
                                // onSubmitEditing={() => cityInput.focus()}
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
                                // onChosen={() => {
                                //         setPullBack(false);
                                //         postalCodeInput.focus();
                                //     }
                                // }
                                // setRef={setCityInput}
                                backgroundColor={'white'}
                            />
                        </View>
                    </View>
                    <Text style={[topLabel, {marginLeft: '2%'}]}>Código Postal</Text>
                    <PostalCodeInput
                        code={postalCode}
                        setCode={setPostalCode}
                        // setRef={setPostalCodeInput}
                        width={43}
                        marginTop={1}
                        type={postcodeType}  // xxxx-xxx
                        placeholder={'Código Postal'}
                        backgroundColor={'white'}
                        
                    />
                </View>
                <Text style={topLabel}>E-mail</Text>
                <CustomTextInput
                    state={email}
                    setState={setEmail}
                    placeholder='E-mail'
                    width={90}
                    marginTop={1}
                    backgroundColor={'white'}
                    pullBack={pullBack}
                />
                <View style={[rowContainer, bottomButtonsContainer]}>
                    <Text 
                        style={underlined}
                        onPress={changePassword}
                    >Mudar Palavra-Passe</Text>
                    <Text 
                        style={underlined}
                        onPress={onUpdate}
                    >Salvar</Text>
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
        height: Dimensions.get('window').height * 1.3
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
    underlined: {
        textDecorationLine: 'underline'
    },
    bottomButtonsContainer: {
        marginTop: 20,
        width: Dimensions.get('screen').width, 
        justifyContent: 'space-evenly'
    }
});

export default UserDetailsScreen;
