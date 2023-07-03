import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectCities, setCitiesAsync } from '../../../../../features/cities/citiesSlice';
import { Ionicons } from '@expo/vector-icons';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import CityInput from '../../../components/CityInput';
import Fonts from '../../../../../utils/Fonts';

const CitiesScreen = ({route, navigation}) => {
    const [citiesState, setCitiesState] = useState([]);
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

    const renderItem = item => <CityInput label={item.label} onDelete={onDelete} key={item.value}/>;

    const {
        container,
        list,
        addButton,
        noCityStyle
    } = styles;
    
    return (
        <View style={container}>
            {
                citiesState.length > 0 ? (
                    <ScrollView
                        contentContainerStyle={list}
                        keyboardDismissMode='on-drag'
                        showsVerticalScrollIndicator={false}
                    >
                        { citiesState.map(ele => renderItem(ele)) }
                    </ScrollView>
                ) : (
                    <Text style={noCityStyle}>Sem Cidades</Text>
                )
            }
            <Pressable
                style={addButton}
                onPress={_ => {
                        navigation.navigate('CreateCity');
                    }
                }
            >
                <Ionicons name="add-outline" size={24} color="black" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        left: 330,
        top: 700,
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#fffff',
        borderWidth: .5
    },
    noCityStyle: {
        ...Fonts.headlineLarge
    }
});

export default CitiesScreen;
