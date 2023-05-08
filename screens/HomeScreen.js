import React, { useState } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
import { ProfilePicture } from '../components/picture/ProfilePicture';

const HomeScreen = ({route, navigation}) => {
    // const { userEmail } = route.params;
    let username = 'Marinna';
    return (
        <View style={styles.outerContainer}>
            <View style={styles.upperContainer}>
                <View style={styles.flexStart}>
                    <View>
                        <Text style={[Fonts.displaySmall, styles.greetingText]}>Olá,</Text>
                    </View>
                    <View>
                        <Text style={[Fonts.headlineMedium, {color: Colors.onPrimaryKeyColor}]}>{username}</Text>
                    </View>
                </View>
                <View style={styles.flexEnd}>
                    <ProfilePicture
                        onPress={() => navigation.navigate('Profile')}
                    />
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        marginTop: ResponsiveDimensions.screen.defaultMarginTop,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        margin: 20
    },
    flexStart: {
        flex: 1, 
        alignItems: 'flex-start'
    },
    flexEnd: {
        flex: 1, 
        alignItems: 'flex-end'
    },
    greetingText: {
        fontWeight: 'bold', 
        color: Colors.onPrimaryKeyColor
    }
});

export { HomeScreen };
