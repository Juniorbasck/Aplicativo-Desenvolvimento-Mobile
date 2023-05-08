import React from 'react';
import {
    Image,
    Pressable,
} from 'react-native';
import { ResponsiveDimensions } from '../../utils/ResponsiveDimensions';

const ProfilePicture = ({onPress, size='small'}) => {
    return (
        <Pressable
            onPress={onPress}
        >   
            <Image
                source={require('../../assets/face1.jpg')}
                resizeMode={'contain'}
                style={ResponsiveDimensions.roundImageContainer[size]}
            />
        </Pressable>
    );
};

export { ProfilePicture };
