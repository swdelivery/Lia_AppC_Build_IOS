import Column from '@Components/Column'
import { IconBagFat, IconCurvedArrow } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { getEyeLabelState } from '@Redux/resultcanningeyes/selectors'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { GREY_FOR_TITLE, RED, WHITE } from '../../../Constant/Color'
import { _moderateScale } from '../../../Constant/Scale'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'

const WIDTH_IMAGE = _moderateScale(8 * 18)
const WIDTH_IMAGE_SMALL = _moderateScale(8 * 8)

const LeftEye = (props) => {
    const { navigate } = useNavigate()
    const { data: dataEyeLabel } = useSelector(getEyeLabelState)
    const { croppedRightEyeImage: { ratio, boxEyelid, boxFatBag, width, height, uri }, scanningResult } = props

    return (
        <View>
            <Row
                gap={8 * 2}
                alignItems='flex-start'
                marginTop={8 * 2}
                paddingHorizontal={8 * 2}>

                <Column flex={1} gap={8}>
                    <Text size={22} weight='bold' color={WHITE} >
                        [ Mắt phải ]
                    </Text>

                    <Column>
                        <Row
                            gap={8}
                            alignItems='center'>
                            <View style={[styles.dot, { backgroundColor: 'red' }]} />
                            <Text size={16} weight='bold' color={RED}>
                                {
                                    dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eylid_type)?.name
                                }
                            </Text>
                        </Row>
                        <Row
                            gap={8}
                            alignItems='center'>
                            <View style={[styles.dot, { backgroundColor: 'red' }]} />
                            <Text size={16} weight='bold' color={RED}>
                                {
                                    dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eye_bag_type)?.name
                                }
                            </Text>
                        </Row>
                    </Column>
                </Column>
                <View style={{ width: WIDTH_IMAGE }}>
                    {
                        ratio ?
                            <View style={{
                                width: WIDTH_IMAGE,
                                height: WIDTH_IMAGE / ratio,
                                borderRadius: _moderateScale(8 * 2),
                                overflow: 'hidden'
                            }}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
                                {
                                    boxEyelid?.point1.x ?
                                        <View style={{
                                            position: 'absolute',
                                            left: WIDTH_IMAGE * boxEyelid?.point1.x / width,
                                            top: WIDTH_IMAGE / ratio * boxEyelid?.point1.y / height - (20)
                                        }}>
                                            <IconCurvedArrow
                                                height={20}
                                                width={WIDTH_IMAGE * (boxEyelid?.point2.x - boxEyelid?.point1.x) / width}
                                            />
                                        </View>
                                        : <></>
                                }
                                {
                                    boxFatBag?.point1.x ?
                                        <View style={{
                                            position: 'absolute',
                                            left: WIDTH_IMAGE * boxFatBag?.point1.x / width,
                                            top: WIDTH_IMAGE / ratio * boxFatBag?.point1.y / height + 4
                                        }}>
                                            <IconBagFat width={WIDTH_IMAGE * (boxFatBag?.point2.x - boxFatBag?.point1.x) / width} />
                                        </View>
                                        : <></>
                                }
                                <Image
                                    style={[styles.overView__box__leftEye__image, {
                                        width: WIDTH_IMAGE,
                                        height: WIDTH_IMAGE / ratio,
                                        position: 'absolute',
                                        zIndex: -1
                                    }]}
                                    source={{ uri: `${uri}` }} />
                            </View>
                            : <></>
                    }

                </View>
            </Row>

            <Column
                alignItems='flex-end'
                marginTop={8 * 2}
                marginHorizontal={8 * 2}>
                <Text color={GREY_FOR_TITLE} weight='bold'>
                    Hoàn tất quá trình quét mắt phải
                </Text>
                <View style={styles.boxResult}>
                    <Text weight='bold'>
                        ! Có 2 vấn đề bạn cần lưu ý
                    </Text>
                </View>
            </Column>

            <Column
                borderRadius={8}
                backgroundColor={WHITE}
                marginHorizontal={8 * 2}
                marginTop={8 * 2}>
                <View style={styles.arrowUp} />
                <Column paddingHorizontal={8 * 2}>
                    <Row
                        gap={8}
                        alignItems='flex-start'
                        marginVertical={8 * 2}>
                        {
                            ratio ?
                                <View style={{
                                    width: WIDTH_IMAGE_SMALL,
                                    height: WIDTH_IMAGE_SMALL / ratio,
                                    borderRadius: 8,
                                    overflow: 'hidden'
                                }}>
                                    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
                                    {
                                        boxEyelid?.point1.x ?
                                            <View style={{
                                                position: 'absolute',
                                                left: WIDTH_IMAGE_SMALL * boxEyelid?.point1.x / width,
                                                top: WIDTH_IMAGE_SMALL / ratio * boxEyelid?.point1.y / height - (10)
                                            }}>
                                                <IconCurvedArrow
                                                    height={10}
                                                    width={WIDTH_IMAGE_SMALL * (boxEyelid?.point2.x - boxEyelid?.point1.x) / width}
                                                />
                                            </View>
                                            : <></>
                                    }
                                    <Image
                                        style={{
                                            width: WIDTH_IMAGE_SMALL,
                                            height: WIDTH_IMAGE_SMALL / ratio,
                                            position: 'absolute',
                                            zIndex: -1,
                                            borderRadius: 8
                                        }}
                                        source={{ uri: `${uri}` }} />
                                </View>
                                : <></>
                        }
                        <Column gap={4} flex={1}>
                            <Row>
                                <Column flex={1}>
                                    <Text numberOfLines={1} weight='bold' color={'#38484F'}>
                                        {
                                            dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eylid_type)?.name
                                        }
                                    </Text>
                                </Column>
                                <TouchableOpacity
                                    onPress={navigate(ScreenKey.SCREEN_HTML,
                                        { title: 'Thông tin chi tiết', value: dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eylid_type)?.detail })}>
                                    <Text color={"#65B4C9"}>
                                        {`Chi tiết >`}
                                    </Text>
                                </TouchableOpacity>
                            </Row>
                            <Text
                                numberOfLines={3}
                                size={12}>
                                {
                                    dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eylid_type)?.description
                                }
                            </Text>
                        </Column>
                    </Row>
                </Column>
                <View style={{ width: '100%', height: .5, backgroundColor: 'rgba(0,0,0,.1)' }} />

                <Column paddingHorizontal={8 * 2}>
                    <Row
                        gap={8}
                        alignItems='flex-start'
                        marginVertical={8 * 2}>
                        {
                            ratio ?
                                <View style={{
                                    width: WIDTH_IMAGE_SMALL,
                                    height: WIDTH_IMAGE_SMALL / ratio,
                                    borderRadius: 8,
                                    overflow: 'hidden'
                                }}>
                                    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
                                    {
                                        boxFatBag?.point1.x ?
                                            <View style={{
                                                position: 'absolute',
                                                left: WIDTH_IMAGE_SMALL * boxFatBag?.point1.x / width,
                                                top: WIDTH_IMAGE_SMALL / ratio * boxFatBag?.point1.y / height + 4,
                                            }}>
                                                <IconBagFat
                                                    height={WIDTH_IMAGE_SMALL / ratio * (boxFatBag?.point3.y - boxFatBag?.point2.y) / height}
                                                    width={WIDTH_IMAGE_SMALL * (boxFatBag?.point2.x - boxFatBag?.point1.x) / width} />
                                            </View>
                                            : <></>
                                    }
                                    <Image
                                        style={{
                                            width: WIDTH_IMAGE_SMALL,
                                            height: WIDTH_IMAGE_SMALL / ratio,
                                            position: 'absolute',
                                            zIndex: -1,
                                            borderRadius: 8
                                        }}
                                        source={{ uri: `${uri}` }} />
                                </View>
                                : <></>
                        }
                        <Column gap={4} flex={1}>
                            <Row>
                                <Column flex={1}>
                                    <Text numberOfLines={1} weight='bold' color={'#38484F'}>
                                        {
                                            dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eye_bag_type)?.name
                                        }
                                    </Text>
                                </Column>

                                <TouchableOpacity
                                    onPress={navigate(ScreenKey.SCREEN_HTML,
                                        { title: 'Thông tin chi tiết', value: dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eye_bag_type)?.detail })}>
                                    <Text color={"#65B4C9"}>
                                        {`Chi tiết >`}
                                    </Text>
                                </TouchableOpacity>
                            </Row>
                            <Text
                                numberOfLines={3}
                                size={12}>
                                {
                                    dataEyeLabel?.find(item => item?.code === scanningResult?.right?.eye_bag_type)?.description
                                }
                            </Text>
                        </Column>
                    </Row>
                </Column>
            </Column>
        </View>
    )
}


export default LeftEye

const styles = StyleSheet.create({
    item__avatar: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8)
    },
    arrowUp: {
        width: _moderateScale(8 * 2),
        height: _moderateScale(8 * 2),
        backgroundColor: 'white',
        position: 'absolute',
        right: _moderateScale(8 * 4),
        top: -_moderateScale(6),
        zIndex: -1,
        transform: [
            { rotate: '45deg' }
        ]
    },
    boxResult: {
        marginTop: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderColor: 'rgba(0,0,0,.4)',
        borderRadius: _moderateScale(8 * 4),
        backgroundColor: 'white'
    },
    overView__box__leftEye__image: {
        borderRadius: _moderateScale(8 * 2)
    },
    dot: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: '#28A745',
    },
})
