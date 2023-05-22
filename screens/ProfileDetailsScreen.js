import { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image,
    Alert
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { ProfilePicture } from '../components/ProfilePicture';
import { Snackbar } from 'react-native-paper';
import { PickImageModal } from '../components/PickImageModal';
import { updateUser } from '../service';

function validate(name, surname, username) {
    return name.length > 0 && surname.length > 0 && username.length > 0;
}

function update(userData, name, surname, username) {
    userData.name = name;
    userData.surname = surname;
    userData.username = username;
    updateUser(userData);
}

function dataChanged(userData, name, surname, username) {
    return userData.name != name || userData.surname != surname || userData.username != username;
}

const ProfileDetailsScreen = ({route, navigation}) => {
    const { userData } = route.params;
    const [name, setName] = useState(userData.name);
    const [surname, setSurname] = useState(userData.surname);
    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [image, setImage] = useState(userData.image);
    const [modalVisible, setModalVisible] = useState(false);
    const [snackBarVisible, setSnackBarVisible] = useState(false);

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                contentContainerStyle={
                    [
                        styles.scrollView, 
                        image ? {
                            height: 1.3 * Dimensions.get('window').height
                        } : {
                            height: Dimensions.get('window').height
                        }
                    ]
                }
                keyboardDismissMode='on-drag'
            >   
                <View style={{marginTop: '5%'}}>
                    <ProfilePicture
                        onPress={() => setModalVisible(true)}
                        size='big'
                        src={image}
                    />
                </View>
                <CustomTextInput
                    state={name}
                    setState={setName}
                    placeholder='Nome'
                    widthPercentage={90}
                    marginTopPercentage={5}
                    autofocus={true}
                />
                <CustomTextInput
                    state={surname}
                    setState={setSurname}
                    placeholder='Apelido'
                    widthPercentage={90}
                />
                <CustomTextInput
                    state={username}
                    setState={setUsername}
                    placeholder='Nome de Utilizador'
                    widthPercentage={90}
                />
                <CustomTextInput
                    state={email}
                    setState={setEmail}
                    placeholder='E-mail'
                    widthPercentage={90}
                    marginBottomPercentage={4}
                    editable={false}
                />
                <CustomButton
                    text={'Guardar'}
                    onPress={() => {
                            let localName = name.trim(), localUsername = username.trim(), localSurname = surname.trim();
                            if (validate(localName, localSurname, localUsername)) {
                                if (dataChanged(userData, localName, localSurname, localUsername)) {
                                    update(userData, localName, localSurname, localUsername);
                                }
                                setSnackBarVisible(true);
                                setTimeout(() => navigation.navigate('Profile', {userData: userData}), 500);
                            } else {
                                Alert.alert('Dados Inválidos', 'Os campos de nome, apelido e nome de utilizador devem ser preenchidos');
                            }
                        }
                    }
                    backgroundColor={Colors.primaryKeyColor}
                    textColor={Colors.onPrimaryKeyColor}
                    widthPercentage={84}
                />
            </ScrollView>
            <Snackbar
                visible={snackBarVisible}
                onDismiss={() => setSnackBarVisible(false)}
                duration={500}
            >
                Dados guardados com sucesso!
            </Snackbar>
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
    }
});

export { ProfileDetailsScreen };
