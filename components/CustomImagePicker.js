import React, { useState } from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../utils/Fonts';
import { Colors } from '../utils/Colors';
import * as ImagePicker from 'expo-image-picker';

const CustomImagePicker = ({state, setState, text, widthPercentage=90, marginBottomPercentage=5}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openGallery = async () => {
        setModalVisible(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            setState(result.assets[0].uri);
        }
    };

    const openCamera = async () => {
        setModalVisible(false);
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            setState(result.assets[0].uri);
        }
    };

    return (
        <View>
            <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={[styles.pressableContainer, {width: widthPercentage / 100 * Dimensions.get('window').width, marginBottom: marginBottomPercentage / 100 * Dimensions.get('window').height}]}
            >   
                <View style={[styles.sideView, {alignItems: 'flex-start'}]}>
                    <Text style={Fonts.bodyMedium}>{text}</Text>
                </View>
                {
                    state && (
                        <View style={[styles.sideView, {alignItems: 'center'}]}>
                            <Text style={Fonts.bodySmall}>{state.split('/')[state.split('/').length - 1]}</Text>
                        </View>
                    )
                }
                <View style={[styles.sideView, {alignItems: 'flex-end'}]}>
                    <Ionicons name={'camera'} size={30} color={'black'}/>
                </View>
            </Pressable>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.modalOuterPressable}
                >
                    <View style={[styles.modalContainer, state ? {top: '80%'} : {top: '85%'}]}>
                        <Pressable 
                            style={styles.modalButton}
                            onPress={openGallery}
                        >
                            <Text style={Fonts.bodyLarge}>Galeria</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.modalButton}
                            onPress={openCamera}
                        >
                            <Text style={Fonts.bodyLarge}>Câmera</Text>
                        </Pressable>
                        {
                            state && (
                                <Pressable 
                                    style={styles.modalButton}
                                    onPress={() => {
                                        setState(null); 
                                        setModalVisible(false);
                                        }
                                    }
                                >
                                    <Text style={Fonts.bodyLarge}>Limpar</Text>
                                </Pressable>
                            )
                        }
                    </View>
                </Pressable>
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
    },
    sideView: {
        flex: 1, 
        margin: '2%'
    },
    modalContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        padding: '5%'
    },
    modalButton: {
        margin: 10
    },
    modalOuterPressable: {
        width: '100%', 
        height: '100%'
    }
});

export { CustomImagePicker };
