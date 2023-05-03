import { Dimensions } from "react-native";

const ResponsiveDimensions = {
    customTextInput: {
        big: {
            width: 0.8385416666666666 * Dimensions.get('screen').width,
            height: 0.05254777070063694 * Dimensions.get('screen').height,
        },
        small: {
            width: 0.40104166666666663 * Dimensions.get('screen').width,
            height: 0.05254777070063694 * Dimensions.get('screen').height,
        }
    }
};

export { ResponsiveDimensions };
