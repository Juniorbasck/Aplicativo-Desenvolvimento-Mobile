import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCities, setCitiesAsync } from '../../../features/cities/citiesSlice';
import LoadingIndicator from '../../../components/LoadingIndicator';
import CityInput from '../components/CityInput';

const CitiesScreen = () => {
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
    
    const renderItem = item => <CityInput label={item.label} key={item.value}/>;

    const {
        container,
        list
    } = styles;
    
    return (
        <View style={container}>
            <ScrollView
                contentContainerStyle={list}
                keyboardDismissMode='on-drag'
                showsVerticalScrollIndicator={false}
            >
            {
                citiesState.map(ele => renderItem(ele))
            }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        // marginTop: 50,
        // height: Dimensions.get('window').height
    }
});

export default CitiesScreen;
