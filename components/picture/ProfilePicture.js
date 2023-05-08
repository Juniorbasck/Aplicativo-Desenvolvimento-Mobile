import {
    Image,
    Pressable,
    StyleSheet
} from 'react-native';
import { ResponsiveDimensions } from '../../utils/ResponsiveDimensions';

const ProfilePicture = ({onPress, useHoverText=false, hoverText='', size='small'}) => {
    return (
        <Pressable
            onPress={onPress}
        >
            <Image
                source={require('../../assets/face1.jpg')}
                resizeMode={'contain'}
                style={
                    [
                        ResponsiveDimensions.roundImageContainer[size],
                    ]
                }
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({

});

export { ProfilePicture };
