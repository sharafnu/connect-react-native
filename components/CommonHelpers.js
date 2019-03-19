import { Platform } from 'react-native';

const CommonHelpers = {

    getIonIconName: function (name) {
        return Platform.OS === 'ios'
            ? `ios-${name}`
            : `md-${name}`
    }
}
export default CommonHelpers;
