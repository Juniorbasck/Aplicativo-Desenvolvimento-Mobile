import React from 'react';
import {
    Image,
    Pressable,
} from 'react-native';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';

const ProfilePicture = ({onPress, size='small', src=require('../assets/face1.jpg')}) => {
    return (
        <Pressable
            onPress={onPress}
        >   
            <Image
                source={src}
                resizeMode={'contain'}
                style={ResponsiveDimensions.roundImageContainer[size]}
            />
        </Pressable>
    );
};

export { ProfilePicture };
