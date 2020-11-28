import React from 'react';
import { View, Dimensions, Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width

export default class ModalSwipe extends React.Component {

    constructor(props) {
        super(props)

        this.position = new Animated.ValueXY();
        this.state = {
            currentIndex: 0,
            isVisible: false
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ["0deg", "0deg", "0deg"],
            extrapolate: 'extend'
        })

        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (gestureState.dx > 50) {
                    this.props.onClose()
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }, useNativeDriver: true
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1, isVisible: false }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else if (gestureState.dx < -50) {
                    this.props.onClose()
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }, useNativeDriver: true
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1, isVisible: false }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4,
                        useNativeDriver: true
                    }).start()
                }
            }
        })

    }

    render() {
        const { children, layoutBackgroundColor, backgroundColor, borderRadius, visible } = this.props;
        return (
            <>
                {
                    visible && <View style={[styles.container, {
                         backgroundColor: layoutBackgroundColor
                    }]}>
                        <Animated.View
                            {...this.PanResponder.panHandlers}
                            style={[{
                                transform: [{
                                    rotate: this.rotate
                                },
                                ...this.position.getTranslateTransform()
                                ]
                            }, styles.animatedContainer]}>
                            <View style={ [styles.moadlBox, { backgroundColor, borderRadius }]} >
                                {children}
                            </View>
                        </Animated.View>
                    </View>
                }
            </>
        );
    }
}

ModalSwipe.defaultProps = {
    visible: false,
    borderRadius: 10,
    onClose: () => { },
    layoutBackgroundColor: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: 'rgba(255, 146, 43, 0.8)'
};

ModalSwipe.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    borderRadius: PropTypes.number,
    children: PropTypes.element.isRequired,
    layoutBackgroundColor: PropTypes.string,
    backgroundColor: PropTypes.string
};