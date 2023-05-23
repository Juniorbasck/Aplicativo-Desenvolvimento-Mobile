import { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { Colors } from '../utils/Colors';
import { fetchHistoric } from '../service';
import { HistoricItem } from '../components/HistoricItem';

const HistoricScreen = () => {
    const [historic, setHistoric] = useState([]);

    useEffect(() => {
        fetchHistoric('', setHistoric);
    }, []);

    const renderItem = ({item}) => <HistoricItem data={item}/>

    return (
        <View style={styles.container}>
            <FlatList
                data={historic}
                renderItem={renderItem}
                keyExtractor={item => item.timestamp}
            />
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

export { HistoricScreen };
