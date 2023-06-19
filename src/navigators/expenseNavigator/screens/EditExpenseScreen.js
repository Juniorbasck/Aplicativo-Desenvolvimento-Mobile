import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import Colors from '../../../utils/Colors';
import Fonts from '../../../utils/Fonts';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomDropdown from '../../../components/CustomDropdown';
import CustomImagePicker from '../../../components/CustomImagePicker';
import CustomCheckbox from '../../../components/CustomCheckbox';
import OkAlert from '../../../components/OkAlert';
import YesNoAlert from '../../../components/YesNoAlert';
import IssuerInput from '../../../components/IssuerInput';
import { getPaymentMethodsAsync, getDefaultPaymentMethodOfAsync } from '../../../../service';
import { Snackbar } from 'react-native-paper';
import { updateExpenseAsync } from '../../../../service';
import { useAppDispatch } from '../../../app/hooks';
import { setExpensesAsync } from '../../../features/expenses/expensesSlice';
import { setHistoricAsync } from '../../../features/historic/historicSlice';

function validate(title, issuer, price) {
    return title.length > 0 && issuer.length > 0 && price?.toString().length > 0;
}

function dataChanged(item, title, issuer, date, price, paymentMethod, image, paid) {
    return item.title != title || item.issuer != issuer || item.date != date || item.price != price || item.paymentMethod != paymentMethod || item.paid != paid || item.image != image;
}

const EditExpenseScreen = ({route, navigation}) => {
    const { item, parentRoute } = route?.params;
    const [title, setTitle] = useState(item?.title);
    const [issuer, setIssuer] = useState(item?.issuer);
    const [issuerPerson, setIssuerPerson] = useState(item?.issuerPerson);
    const [date, setDate] = useState(item?.date);
    const [price, setPrice] = useState(item?.price?.toString());
    const [paymentMethod, setPaymentMethod] = useState(item?.paymentMethod);
    const [image, setImage] = useState(item?.image);
    const [paid, setPaid] = useState(item?.paid);
    
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [titleInput, setTitleInput] = useState();
    const [issuerInput, setIssuerInput] = useState();
    const [priceInput, setPriceInput] = useState();

    const [action, setAction] = useState();

    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [invalidDataAlertVisible, setInvalidDataAlertVisible] = useState(false);
    const [updateDataAlertVisible, setUpdateDataAlertVisible] = useState(false);

    const [invalidDataAlertMsg, setInvalidDataAlertMsg] = useState('');

    const dispatch = useAppDispatch();
    
    const [pullBack, setPullBack] = useState(false);

    const edit = async () => {
        let localTitle = title.trim(), localIssuer = issuer.trim(), localPrice = price.trim();
        if (validate(localTitle, localIssuer, price)) {
            if (dataChanged(item, localTitle, localIssuer, date, localPrice, paymentMethod, image, paid)) {
                try {
                    let newExpense = {
                        id: item.id,
                        title: localTitle,
                        issuer: localIssuer,
                        date: date,
                        price: localPrice,
                        paymentMethod: paymentMethod,
                        image: image,
                        paid: paid
                    };
                    await updateExpenseAsync(item, newExpense);
                    dispatch(setExpensesAsync());
                    dispatch(setHistoricAsync());
                } catch (err) {
                    setInvalidDataAlertMsg(err.message);
                    setInvalidDataAlertVisible(true);
                    return false;
                }
            }
            return true;
        } else {
            setInvalidDataAlertMsg('Preencha o título, entidade e preço corretamente');
            setInvalidDataAlertVisible(true);
            return false;
        }
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            let localTitle = title.trim(), localIssuer = issuer.trim(), localPrice = price.trim();
            if (e.data.action.type === 'POP' && dataChanged(item, localTitle, localIssuer, date, localPrice, paymentMethod, image, paid)) {
                e.preventDefault();
                setAction(e.data.action);
                setUpdateDataAlertVisible(true);
            }
        });
    }, [navigation, title, issuer, date, price, paymentMethod, image, paid]);

    useEffect(() => {
        getPaymentMethodsAsync(methods => setPaymentMethods(methods));
    }, []);

    const {
        outerContainer,
        scrollView,
        rowContainer,
        imageStyle,
        paymentMethodsStyle,
        topLabel
    } = styles;

    return (
        <View style={outerContainer}>
            <ScrollView 
                contentContainerStyle={
                    [
                        scrollView, 
                        image ? {
                            height: 1.4 * Dimensions.get('window').height
                        } : {
                            height: Dimensions.get('window').height
                        }
                    ]
                }
                keyboardDismissMode='on-drag'
            >   
                <Text style={topLabel}>Título</Text>
                <CustomTextInput
                    state={title}
                    setState={setTitle}
                    placeholder='Título'
                    width={90}
                    marginTop={0}
                    marginBottom={3}
                    autofocus={true}
                    setRef={setTitleInput}
                    onSubmitEditing={() => issuerInput?.focus()}
                />
                <Text style={topLabel}>Emissor</Text>
                <IssuerInput
                    state={issuer}
                    setState={setIssuer}
                    width={90}
                    marginTop={0}
                    marginBottom={3}
                    onTextInputSubmitEditing={() => priceInput.focus()}
                    onFocusSearchDropdown={() => setPullBack(true)}
                    onChosenSearchDropDown={async newIssuer => {
                            setPullBack(false);
                            try {
                                setPaymentMethod(await getDefaultPaymentMethodOfAsync(newIssuer));
                            } catch (err) {
                                console.log('Error when trying to invoke getDefaultPaymentMethodOfAsync -----');
                                console.log(err.message);
                                setPaymentMethod(1);
                            }
                            priceInput.focus();
                        }
                    }
                    setRef={setIssuerInput}
                    person={item?.issuerPerson}
                    onPress={() => setIssuerPerson(!issuerPerson)}
                />
                <Text style={[topLabel, pullBack ? {zIndex: -10} : {}]}>Preço</Text>
                <CustomTextInput
                    state={price}
                    setState={setPrice}
                    keyboardType='numeric'
                    placeholder='Preço'
                    width={90}
                    marginTop={0}
                    marginBottom={4}
                    setRef={setPriceInput}
                    pullBack={pullBack}
                />
                <Text style={topLabel}>Data de Vencimento</Text>
                <CustomDatePicker
                    state={date}
                    setState={setDate}
                    width={90}
                    marginTop={0}
                    marginBottom={3}
                />
                <View style={rowContainer}>
                    <View style={paymentMethodsStyle}>
                        <Text style={Fonts.bodyLarge}>Método de</Text>
                        <Text style={Fonts.bodyLarge}>Pagamento</Text>
                    </View>
                    <CustomDropdown
                        state={paymentMethod}
                        setState={setPaymentMethod}
                        options={paymentMethods}
                        width={40}
                        marginBottom={3}
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
                            source={image}
                            resizeMode='contain'
                            style={imageStyle}
                        />
                    )
                }
                <CustomCheckbox
                    state={paid}
                    setState={setPaid}
                    marginTop={0}
                    marginBottom={2}
                    text={'Pago'}
                    size={28}
                    round={true}
                />
                <CustomButton
                    text={'Guardar'}
                    onPress={async () => {
                            let edited = await edit();
                            if (edited) {
                                setSnackBarVisible(true);
                                setTimeout(() => navigation.navigate(parentRoute), 500);
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
                Despesa guardada com sucesso!
            </Snackbar>
            <YesNoAlert
                title={'Editar Despesa'}
                description={'Desejas salvar as alterações?'}
                visible={updateDataAlertVisible}
                setVisible={setUpdateDataAlertVisible}
                onPressYes={async () => {
                        let editStatus = await edit();
                        if (editStatus) {
                            setSnackBarVisible(true);
                            setTimeout(() => navigation.dispatch(action), 500);
                        }
                    }
                }
                onPressNo={() => navigation.dispatch(action)}
            />
            <OkAlert
                title={'Dados Inválidos!'}
                description={invalidDataAlertMsg}
                visible={invalidDataAlertVisible}
                setVisible={setInvalidDataAlertVisible}
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
        paddingVertical: '8%',
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
    paymentMethodsStyle: {
        flex: 1, 
        alignItems: 'center'
    },
    imageStyle: {
        alignSelf: 'center',
        width: .9 * Dimensions.get('window').width,
        height: .3 * Dimensions.get('window').height,
        marginBottom: '8%'
    },
    topLabel: {
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: '2%'
    }
});

export default EditExpenseScreen;
