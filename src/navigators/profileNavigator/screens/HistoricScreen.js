import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native';
import Colors from '../../../utils/Colors';
import HistoricItem from '../../../components/HistoricItem';
import Fonts from '../../../utils/Fonts';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {
    useAppSelector,
    useAppDispatch
} from '../../../app/hooks';
import {
    selectHistoric,
    setHistoricAsync
} from '../../../features/historic/historicSlice';

const HistoricScreen = () => {
    const historic = useAppSelector(selectHistoric);
    const historicStatus = useAppSelector(state => state.historic.status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setHistoricAsync());
    }, []);

    const renderItem = ({item}) => <HistoricItem data={item}/>

    const {
        container,
    } = styles;

    const {
        displaySmall
    } = Fonts;

    if (historicStatus === 'loading')
        return <LoadingIndicator/>

    return (
        <View style={container}>
            {
                historic?.value?.length === 0 ? (
                    <Text style={[displaySmall, {color: 'white'}]}>Sem Histórico</Text>
                ) : (
                    <FlatList
                        data={historic.value}
                        renderItem={renderItem}
                        keyExtractor={item => item.timestamp}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HistoricScreen;
