import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectUsers, setUsersAsync } from '../../../../../features/users/usersSlice';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import UserCard from '../../../components/UserCard';
import YesNoAlert from '../../../../../components/YesNoAlert';

const UsersScreen = ({navigation}) => {
    const users = useAppSelector(selectUsers);
    const usersStatus = useAppSelector(state => state.users.status);

    const [alertVisible, setAlertVisible] = useState(false);
    const [userToBlock, setUserToBlock] = useState('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUsersAsync());
    }, []);

    const onPress = user => {
        navigation.navigate('UserDetails', {
            user: user
        });
    };

    const onLongPress = user => {
        setUserToBlock(user?.username);
        setAlertVisible(true);
    };

    const {
        container,
        flatListStyle
    } = styles;

    if (usersStatus === 'loading')
        return <LoadingIndicator/>

    return (
        <View style={container}>
            <FlatList
                contentContainerStyle={flatListStyle}
                data={users.value}
                renderItem={({item}) => <UserCard data={{...item, onPress: onPress, onLongPress: onLongPress}}/>}
                keyExtractor={item => item.id}
            />
            <YesNoAlert
                visible={alertVisible}
                setVisible={setAlertVisible}
                title={'Bloquear Utilizador'}
                description={`Desejas realmente bloquear utilizador '${userToBlock}'?`}
                onPressYes={() => {
                        console.log('BLOCKED');
                    }
                }
                onPressNo={() => {
                        console.log('CANCELED');
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
        justifyContent: 'center'
    },
    flatListStyle: {
        marginTop: '5%',
        width: Dimensions.get('screen').width
    }
});

export default UsersScreen;
