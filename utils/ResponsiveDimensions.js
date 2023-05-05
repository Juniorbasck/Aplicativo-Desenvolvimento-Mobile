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
    },
    squareCheckbox: {
        width: 0.04861111111111111 * Dimensions.get('screen').width,
        height: 0.023885350318471336 * Dimensions.get('screen').height
    },
    circleCheckbox: {
        width: 0.05347222222222222 * Dimensions.get('screen').width,
        height: 0.023885350318471336 * Dimensions.get('screen').height
    },
    customButton: {
        height: 0.04777070063694267 * Dimensions.get('screen').height
    },
    smallSquareImageContainer: {
        width: 0.24305555555555555 * Dimensions.get('screen').width,
        height: 0.11942675159235669 * Dimensions.get('screen').height
    },
    screen: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        defaultMarginTop: .06 * Dimensions.get('screen').height
    },

};

export { ResponsiveDimensions };
