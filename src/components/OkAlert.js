import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Modal
} from 'react-native';
import { Fonts } from '../utils/Fonts';

const OkAlert = ({visible, setVisible, title, description, onPressOk}) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <Pressable
                onPress={() => setVisible(false)}
                style={styles.alertOuterPressable}
            >
                <View style={styles.alertContainer}>
                    <Text style={[styles.title, Fonts.headlineSmall]}>{title}</Text>
                    <Text style={[styles.description, Fonts.bodyLarge]}>{description}</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable 
                            style={styles.alertButton}
                            onPress={() => {
                                    onPressOk();
                                    setVisible(false);
                                }
                            }
                        >
                            <Text style={Fonts.bodyLarge}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    alertOuterPressable: {
        width: '100%', 
        height: '100%'
    },
    alertContainer: {
        position: 'absolute',
        left: '10%',
        top: '35%',
        width: '80%',
        height: '30%',
        backgroundColor: 'white',
        padding: '5%'
    },
    title: {
        margin: '2%',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    description: {
        margin: '2%',
        textAlign: 'left'
    },
    buttonContainer: {
        margin: '2%',
        marginTop: '35%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    alertButton: {
        marginHorizontal: '5%'
    }
});

export { OkAlert };
