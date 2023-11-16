import React, { memo, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { BtnHistory, IconCancelGrey, IconTick } from '../../../Components/Icon/Icon'
import { BASE_COLOR, BORDER_COLOR, GREY_FOR_TITLE, PRICE_ORANGE, WHITE } from '../../../Constant/Color'
import { stylesFont } from '../../../Constant/Font'
import { sizeIcon } from '../../../Constant/Icon'
import { _height, _heightScale, _moderateScale, _width } from '../../../Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import CardBranch from './CardBranch'
import Column from '@Components/Column'
import CardDoctor from './CardDoctor'
import Text from '@Components/Text'
import Row from '@Components/Row'
import CircleTick from '@Components/CircleTick/CircleTick'
import SquareTick from '@Components/SquareTick/SquareTick'

const HEIGHT_MODAL = _heightScale(600)


type Props = {
    visible: boolean;
    onClose: () => void;
}

const ModalListBeautyInsurance = memo(({ visible, onClose }: Props) => {

    const opacityBackDrop = useSharedValue(0);
    const tranYModal = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 200 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {
        }
    }, [visible])


    const animTranY = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYModal.value
                }
            ]
        }
    })

    const animOpacityBackDrop = useAnimatedStyle(() => {
        return {
            opacity: opacityBackDrop.value
        }
    })

    const _handleHideModal = () => {
        tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
            if (fnd) {
                runOnJS(_hideModal)()
            }
        })
        opacityBackDrop.value = withTiming(0, { duration: 200 })
    }
    const _hideModal = () => {
        onClose()
    }

    const ItemInsurance = ({ data, isTicked }) => {
        return (
            <Column
                padding={8 * 2}
                borderBottomWidth={1}
                borderBottomColor={BORDER_COLOR}>
                <Row gap={8 * 2}>
                    <Column gap={4} flex={1}>
                        <Text weight='bold' color={BASE_COLOR}>
                            Bảo hiểm làm đẹp cá nhân
                        </Text>
                        <Text >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </Text>
                        <Text color={PRICE_ORANGE} weight='bold'>
                            500.000 VNĐ
                        </Text>

                    </Column>
                    <Column>
                        <SquareTick isTicked={isTicked} />
                    </Column>
                </Row>
            </Column>
        )
    }

    if (!visible) {
        return null
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[{
                width: _width,
                height: _height,
            }, { backgroundColor: 'rgba(0,0,0,.7)' }, animOpacityBackDrop]}>
                <TouchableOpacity onPress={() => _handleHideModal()} style={[StyleSheet.absoluteFillObject]} />
            </Animated.View>

            <Animated.View style={[styles.mainView, animTranY]}>
                <View style={styles.header}>
                    <View style={styles.header__child}>
                        <Text size={16}>
                            Bảo hiểm làm đẹp
                        </Text>

                        <TouchableOpacity
                            hitSlop={styleElement.hitslopSm}
                            onPress={_handleHideModal}
                            style={styles.cancelBtn}>
                            <IconCancelGrey style={sizeIcon.sm} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <Column >
                        {
                            [1, 2, 3, 4, 5, 6]?.map((item, index) => {
                                return (
                                    <ItemInsurance
                                        data={item}
                                        isTicked={index % 2 == 0 ? true : false}
                                        key={index} />
                                )
                            })
                        }
                    </Column>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </Animated.View>
        </View>

    )
})


export default ModalListBeautyInsurance

const styles = StyleSheet.create({
    cancelBtn: {
        position: 'absolute',
        right: _moderateScale(8 * 3),
        zIndex: 100,
        top: _moderateScale(8 * 2)
    },
    header__child: {
        justifyContent: 'center',
        alignItems: 'center',
        width: _width,
        height: _moderateScale(8 * 6)
    },
    mainView: {
        width: _width,
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingBottom: _moderateScale(8 * 2),
        position: 'absolute',
        bottom: -HEIGHT_MODAL,
        height: HEIGHT_MODAL,
    },
    header: {
        // marginTop: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        alignItems: 'center'
    },
    container: {
        width: _width,
        height: _height,
        position: 'absolute',
        zIndex: 100,
        bottom: 0
    }

})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,

    elevation: 5
}
