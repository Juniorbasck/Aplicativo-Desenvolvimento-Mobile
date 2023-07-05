import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectCities, setCitiesAsync } from '../../../../../features/cities/citiesSlice';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import DeletableInput from '../../../components/DeletableInput';
import Fonts from '../../../../../utils/Fonts';
import AddButton from '../../../components/AddButton';

const CitiesScreen = ({route, navigation}) => {
    const [citiesState, setCitiesState] = useState([]);
    // const [citiesState, setCitiesState] = useState([
    //     {
    //         'value': 1,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 2,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 3,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 4,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 5,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 6,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 7,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 8,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 9,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 10,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 11,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 12,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 13,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 14,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 15,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 16,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 17,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 18,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 19,
    //         'label': 'Lisboa'
    //     },
    //     {
    //         'value': 20,
    //         'label': 'Lisboa'
    //     }
    // ]);
    const cities = useAppSelector(selectCities);
    const citiesStatus = useAppSelector(status => status.cities.status);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(setCitiesAsync());
    }, []);

    useEffect(() => {
        if (cities?.value)
            setCitiesState(cities.value);
    }, [cities]);
    
    if (citiesStatus === 'loading')
        return <LoadingIndicator/>
    
    const onDelete = item => setCitiesState(citiesState.filter(city => city.label != item));

    const renderItem = item => <DeletableInput label={item.label} onDelete={onDelete} key={item.value}/>;

    const {
        container,
        noCityStyle
    } = styles;
    
    return (
        <View style={container}>
            {
                citiesState.length > 0 ? (
                    <ScrollView
                        keyboardDismissMode='on-drag'
                        showsVerticalScrollIndicator={false}
                    >
                        { citiesState.map(ele => renderItem(ele)) }
                    </ScrollView>
                ) : (
                    <Text style={noCityStyle}>Sem Cidades</Text>
                )
            }
            <AddButton    
                onPress={_ => {
                        navigation.navigate('CreateCity');
                    }
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noCityStyle: {
        ...Fonts.headlineLarge,
        textAlign: 'center'
    },
});

export default CitiesScreen;
