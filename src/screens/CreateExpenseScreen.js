import { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { CustomDatePicker } from '../components/CustomDatePicker';
import { CustomDropdown } from '../components/CustomDropdown';
import { CustomImagePicker } from '../components/CustomImagePicker';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { 
    getPaymentMethods, 
    createExpense 
} from '../../service';
import { Snackbar } from 'react-native-paper';
import { OkAlert } from '../components/OkAlert';
import { useAppDispatch } from '../app/hooks';
import { setExpensesAsync } from '../features/expenses/expensesSlice';

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

const CreateExpenseScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [entity, setEntity] = useState('');
    const [date, setDate] = useState(getFormattedTodayDate());
    const [price, setPrice] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [image, setImage] = useState(null);
    const [paid, setPaid] = useState(false);

    const [titleInput, setTitleInput] = useState();
    const [entityInput, setEntityInput] = useState();
    const [priceInput, setPriceInput] = useState();
    const [modalOpenState, setModalOpenState] = useState(false);

    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const dispatch = useAppDispatch();

    const create = async () => {
        let localTitle = title.trim(), localEntity = entity.trim(), localPrice = price.trim();
        if (validate(localTitle, localEntity, localPrice)) {
            try {
                await createExpense(localTitle, localEntity, date, localPrice, paymentMethod, image, paid);
                dispatch(setExpensesAsync());
            } catch(err) {
                setAlertMsg(err.message);
                setAlertVisible(true);
                return false;
            }
            return true;
        } else {
            setAlertMsg('Preencha os campos de título, entidade e preço corretamente');
            setAlertVisible(true);
            return false;
        }
    }

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
                    setRef={setTitleInput}
                    onSubmitEditing={() => entityInput.focus()}
                    blurOnSubmit={false}
                />
                <CustomTextInput
                    state={entity}
                    setState={setEntity}
                    placeholder='Entidade'
                    widthPercentage={90}
                    setRef={setEntityInput}
                    onSubmitEditing={() => priceInput.focus()}
                    blurOnSubmit={false}
                />
                <CustomTextInput
                    state={price}
                    setState={setPrice}
                    keyboardType='numeric'
                    placeholder='Preço'
                    widthPercentage={90}
                    marginBottomPercentage={4}
                    setRef={setPriceInput}
                    onSubmitEditing={() => setModalOpenState(true)}
                />
                <CustomDatePicker
                    state={date}
                    setState={setDate}
                    widthPercentage={90}
                    marginBottomPercentage={3}
                    modalOpenState={modalOpenState}
                    setModalOpenState={setModalOpenState}
                />
                <View style={styles.rowContainer}>
                    <View style={styles.paymentMethodContainer}>
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
                    onPress={async () => {
                            let created = await create();
                            if (created) {
                                setSnackBarVisible(true);
                                setTimeout(() => navigation.goBack(), 500);
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
            <OkAlert
                title={'Dados Inválidos!'}
                description={alertMsg}
                visible={alertVisible}
                setVisible={setAlertVisible}
                onPressOk={() => {}}
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
    },
    paymentMethodContainer: {
        flex: 1, 
        alignItems: 'center'
    }
});

export { CreateExpenseScreen };
