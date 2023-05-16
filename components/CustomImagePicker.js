import React, { useState } from 'react';
import {
    Alert,
    Pressable,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Button
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../utils/Fonts';
import { Colors } from '../utils/Colors';
import ImagePicker from 'expo-image-picker';

const CustomImagePicker = ({state, setState, text, widthPercentage=90, marginBottomPercentage=5}) => {
    const [image, setImage] = useState(null);

    const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const openCamera = async () => {
        
    }

    return (
        <View>
            <Pressable
                onPress={openGallery}
                style={[styles.pressableContainer, {width: widthPercentage / 100 * Dimensions.get('window').width, marginBottom: marginBottomPercentage / 100 * Dimensions.get('window').height}]}
            >   
                <View style={[styles.sideView, {alignItems: 'flex-start'}]}>
                    <Text style={Fonts.bodyMedium}>{text}</Text>
                </View>
                <View style={[styles.sideView, {alignItems: 'flex-end'}]}>
                    <Ionicons name={'camera'} size={30} color={'black'}/>
                </View>
            </Pressable>
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
    },
    sideView: {
        flex: 1, 
        margin: '2%'
    }
});

export { CustomImagePicker };
