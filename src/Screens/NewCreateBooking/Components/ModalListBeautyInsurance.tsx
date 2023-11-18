import Column from '@Components/Column'
import Row from '@Components/Row'
import SquareTick from '@Components/SquareTick/SquareTick'
import Text from '@Components/Text'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import { selectInsurance } from '@Redux/booking/actions'
import { getDataCreateBookingState } from '@Redux/booking/selectors'
import { getInsuranceListState } from '@Redux/insurance/selectors'
import React, { memo, useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { IconCancelGrey } from '../../../Components/Icon/Icon'
import { BASE_COLOR, BORDER_COLOR, PRICE_ORANGE, WHITE } from '../../../Constant/Color'
import { sizeIcon } from '../../../Constant/Icon'
import { _height, _heightScale, _moderateScale, _width } from '../../../Constant/Scale'

const HEIGHT_MODAL = _heightScale(600)


type Props = {
    visible: boolean;
    onClose: () => void;
}

const ModalListBeautyInsurance = memo(({ visible, onClose }: Props) => {

    const dispatch = useDispatch()

    const opacityBackDrop = useSharedValue(0);
    const tranYModal = useSharedValue(0);

    const { data: dataListInsurance } = useSelector(getInsuranceListState);
    const { dataInsurance } = useSelector(getDataCreateBookingState);

    useEffect(() => {
        if (visible) {
            tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 200 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {
        }
    }, [visible])

    useEffect(() => {

    }, [])


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

        const _handleAddInsurance = useCallback(() => {
            dispatch(selectInsurance(data))
        }, [data])

        return (
            <Column
                padding={8 * 2}
                borderBottomWidth={1}
                borderBottomColor={BORDER_COLOR}>
                <Row gap={8 * 2}>
                    <Column gap={4} flex={1}>
                        <Text weight='bold' color={BASE_COLOR}>
                            {data?.name}
                        </Text>
                        <Text >
                            {data?.description}
                        </Text>
                        <Text color={PRICE_ORANGE} weight='bold'>
                            {formatMonney(data?.price)} VNĐ
                        </Text>
                    </Column>
                    <Column>
                        <TouchableOpacity onPress={_handleAddInsurance}>
                            <SquareTick isTicked={isTicked} />
                        </TouchableOpacity>
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
                            dataListInsurance?.map((item, index) => {
                                return (
                                    <ItemInsurance
                                        data={item}
                                        isTicked={dataInsurance?.find(itemFind => itemFind?._id == item?._id)}
                                        key={index} />
                                )
                            })
                        }
                    </Column>
                    <View style={{ height: 100 }} />
                </ScrollView>
                <View style={styles.bottomAction}>
                    <TouchableOpacity
                        onPress={_handleHideModal}
                        style={styles.btnAction}>
                        <LinearGradient
                            style={[StyleSheet.absoluteFillObject, { borderRadius: 8, }]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={["#01AB84", "#186A57"]}
                        />
                        <Text color={WHITE} size={16} weight='bold'>
                            Xác nhận ({`${formatMonney(dataInsurance?.reduce((sum, { price }) => sum + price, 0))}`} VNĐ)
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>

    )
})


export default ModalListBeautyInsurance

const styles = StyleSheet.create({
    btnAction: {
        marginHorizontal: _moderateScale(8 * 2),
        height: _moderateScale(8 * 5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomAction: {
        height: _moderateScale(8 * 7),
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
        width: _width,
        justifyContent: 'center',
        // alignItems:'center'
    },
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
