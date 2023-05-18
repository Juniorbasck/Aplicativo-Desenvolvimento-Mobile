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
import { CustomDatePicker } from '../components/CustomDatePicker';
import { CustomDropdown } from '../components/CustomDropdown';
import { CustomImagePicker } from '../components/CustomImagePicker';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { getPaymentMethods } from '../service';
import { createExpense } from '../service';
import { Snackbar } from 'react-native-paper';

function validate(title, entity, price) {
    return title.length > 0 && entity.length > 0 && price?.toString().length > 0;
}

function getFormattedTodayDate() {
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) {
        month = '0' + month;
    }
    return date.getFullYear() + '-' + month + '-' + date.getDate();
}

const CreateExpenseScreen = ({route, navigation}) => {
    const [title, setTitle] = useState('');
    const [entity, setEntity] = useState('');
    const [date, setDate] = useState(getFormattedTodayDate());
    const [price, setPrice] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [image, setImage] = useState(null);
    const [paid, setPaid] = useState(false);

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
                <CustomTextInput
                    state={title}
                    setState={setTitle}
                    placeholder='Título'
                    widthPercentage={90}
                    marginTopPercentage={5}
                    autofocus={true}
                />
                <CustomTextInput
                    state={entity}
                    setState={setEntity}
                    placeholder='Entidade'
                    widthPercentage={90}
                />
                <CustomTextInput
                    state={price}
                    setState={setPrice}
                    keyboardType='numeric'
                    placeholder='Preço'
                    widthPercentage={90}
                    marginBottomPercentage={4}
                />
                <CustomDatePicker
                    state={date}
                    setState={setDate}
                    widthPercentage={90}
                    marginBottomPercentage={3}
                />
                <View style={styles.rowContainer}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={Fonts.bodyLarge}>Método de</Text>
                        <Text style={Fonts.bodyLarge}>Pagamento</Text>
                    </View>
                    <CustomDropdown
                        state={paymentMethod}
                        setState={setPaymentMethod}
                        options={getPaymentMethods()}
                        widthPercentage={40}
                        marginBottomPercentage={3}
                    />
                </View>
                <CustomImagePicker
                    state={image}
                    setState={setImage}
                    text={'Foto da Fatura (opcional)'}
                />
                {
                    image && (
                        <Image
                            source={{uri: image}}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    )
                }
                <CustomCheckbox
                    state={paid}
                    setState={setPaid}
                    marginTopPercentage={0}
                    marginBottomPercentage={2}
                    text={'Pago'}
                    size={28}
                    round={true}
                />
                <CustomButton
                    text={'Criar'}
                    onPress={() => {
                            if (validate(title, entity, price)) {
                                createExpense(title, entity, date, price, paymentMethod, image, paid);
                                setSnackBarVisible(true);
                                setTimeout(() => navigation.goBack(), 500);
                            } else {
                                Alert.alert('Dados inválidos!', 'Preencha o título, entidade e preço e tente novamente!');
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
                Nova despesa criada!
            </Snackbar>
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

export { CreateExpenseScreen };
