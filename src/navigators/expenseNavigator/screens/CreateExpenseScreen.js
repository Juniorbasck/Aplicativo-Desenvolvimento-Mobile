import React, { useState, useEffect } from 'react';
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
import YesNoAlert  from '../../../components/YesNoAlert';
import OkAlert from '../../../components/OkAlert';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { 
    getPaymentMethodsAsync, 
    createNewExpenseAsync,
    getDefaultPaymentMethodOfAsync
} from '../../../../service';
import { useAppDispatch } from '../../../app/hooks';
import { setExpensesAsync } from '../../../features/expenses/expensesSlice';
import { setHistoricAsync } from '../../../features/historic/historicSlice';
import { getFormattedTodayDate } from '../../../utils/Date';
import { validateExpenseData } from '../../../utils/Validator';
import IssuerInput from '../../../components/IssuerInput';

const CreateExpenseScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [issuer, setIssuer] = useState('');
    const [issuerPerson, setIssuerPerson] = useState(true);
    const [date, setDate] = useState(getFormattedTodayDate());
    const [price, setPrice] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [image, setImage] = useState(null);
    const [paid, setPaid] = useState(false);

    const [pullBack, setPullBack] = useState(false);

    const [paymentMethods, setPaymentMethods] = useState([]);

    const [titleInput, setTitleInput] = useState();
    const [issuerInput, setIssuerInput] = useState();
    const [priceInput, setPriceInput] = useState();
    const [modalOpenState, setModalOpenState] = useState(false);

    const [invalidDataAlertVisible, setInvalidDataAlertVisible] = useState(false);
    const [invalidDataAlertMsg, setInvalidDataAlertMsg] = useState('');
    const [createExpenseAlertVisible, setCreateExpenseAlertVisible] = useState(false);

    const [action, setAction] = useState();

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const create = async () => {
        let localTitle = title.trim(), localIssuer = issuer.trim(), localPrice = price.trim();
        if (validateExpenseData(localTitle, localIssuer, localPrice)) {
            try {
                await createNewExpenseAsync(
                    localTitle, 
                    localIssuer, 
                    date, 
                    localPrice, 
                    paymentMethod, 
                    image, 
                    paid,
                    issuerPerson
                );
                dispatch(setExpensesAsync());
                dispatch(setHistoricAsync());
            } catch(err) {
                setInvalidDataAlertMsg(err.message);
                setInvalidDataAlertVisible(true);
                return false;
            }
            return true;
        } else {
            setInvalidDataAlertMsg('Preencha os campos de título, emissor e preço corretamente');
            setInvalidDataAlertVisible(true);
            return false;
        }
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            if (e.data.action.type === 'POP') {
                e.preventDefault();
                setAction(e.data.action);
                setCreateExpenseAlertVisible(true);
            }
        });
    }, [navigation]);

    useEffect(() => {
        getPaymentMethodsAsync(methods => setPaymentMethods(methods));
    }, []);

    const {
        outerContainer,
        scrollView,
        topLabel,
        rowContainer,
        paymentMethodContainer,
        imageStyle
    } = styles;

    if (loading)
        return <LoadingIndicator loadingMessage='Criando despesa...'/>;

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
                    onSubmitEditing={() => issuerInput.focus()}
                    blurOnSubmit={false}
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
                    onSubmitEditing={() => setModalOpenState(true)}
                    pullBack={pullBack}
                />
                <Text style={topLabel}>Data de Vencimento</Text>
                <CustomDatePicker
                    state={date}
                    setState={setDate}
                    width={90}
                    marginTop={0}
                    marginBottom={3}
                    modalOpenState={modalOpenState}
                    setModalOpenState={setModalOpenState}
                />
                <View style={rowContainer}>
                    <View style={paymentMethodContainer}>
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
                    text={'Criar'}
                    onPress={async () => {
                            setLoading(true);
                            let created = await create();
                            setLoading(false);
                            if (created) 
                                navigation.navigate('Expense', {created: true});
                        }
                    }
                    backgroundColor={Colors.primaryKeyColor}
                    textColor={Colors.onPrimaryKeyColor}
                    widthPercentage={84}
                />
            </ScrollView>
            <YesNoAlert
                title={'Criar Despesa'}
                description={'Se saíres, perderás qualquer dado inserido. Proceder?'}
                visible={createExpenseAlertVisible}
                setVisible={setCreateExpenseAlertVisible}
                onPressYes={() => navigation.dispatch(action)}
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
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: Colors.secondaryKeyColor,
        paddingVertical: '8%'
    },
    rowContainer: {
        flexDirection: 'row'
    },
    paymentMethod: {
        textAlign: 'center',
    },
    imageStyle: {
        alignSelf: 'center',
        width: .9 * Dimensions.get('window').width,
        height: .3 * Dimensions.get('window').height,
        marginBottom: '8%'
    },
    paymentMethodContainer: {
        flex: 1, 
        alignItems: 'center'
    },
    topLabel: {
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: '2%'
    }
});

export default CreateExpenseScreen;
