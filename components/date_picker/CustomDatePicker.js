import React, { useState } from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    View,
    Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../../utils/Fonts';
import { Colors } from '../../utils/Colors';
import { format } from '../../utils/DateFormatter';
import DatePicker from 'react-native-modern-datepicker';

const CustomDatePicker = ({state, setState, size='small'}) => {
    
    const [open, setOpen] = useState(false);
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
         >
            <Pressable
                onPress={() => setOpen(!open)}
                style={[styles.pressableContainer, size == 'small' ? {width: '50%'} : {width: '83%'}]}
            >   
                <View style={[styles.sideView, {alignItems: 'flex-start'}]}>
                    <Ionicons name={'calendar'} size={30} color={'black'}/>
                </View>
                <View style={[styles.sideView, {alignItems: 'flex-end'}]}>
                    <Text style={Fonts.bodyMedium}>{format(state, '/')}</Text>
                </View>
            </Pressable>
            <Modal
                animationType={'slide'}
                visible={open}
                transparent={true}
            >   
                <View
                    style={styles.modalView}
                >
                    <DatePicker
                        mode={'calendar'}
                        current={format(state, '-')}
                        selected={format(state, '-')}
                        onDateChange={(date) => {
                            let dateArr = date.split('/');
                            setState(new Date(dateArr[0], dateArr[1] - 1, dateArr[2]));
                            setOpen(!open);
                        }}
                        style={{backgroundColor: Colors.secondaryKeyColor}}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    pressableContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: Colors.primaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: '1%',
        backgroundColor: Colors.secondaryKeyColor
    },
    sideView: {
        flex: 1, 
        margin: '2%'
    },
    modalView: {
        backgroundColor: Colors.secondaryKeyColor,
        position: 'absolute', 
        left: '15%', 
        top: '25%', 
        width: '70%', 
        height: '38%', 
        padding: '5%', 
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 5
    }
});

export { CustomDatePicker };
