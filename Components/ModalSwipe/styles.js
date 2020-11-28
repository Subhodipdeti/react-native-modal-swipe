import { Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    },
    animatedContainer: {
        height: SCREEN_HEIGHT / 2, 
        width: SCREEN_WIDTH, 
        padding: 10, 
        position: 'absolute'
    },
    moadlBox: {
        flex: 1,
        height: SCREEN_HEIGHT / 2, 
        width: '100%', 
        padding: 10, 
        justifyContent: 'flex-end', 
        alignItems: 'center',
    }

}