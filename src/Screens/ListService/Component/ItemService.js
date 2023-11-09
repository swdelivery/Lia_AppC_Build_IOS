import React from 'react'
import { StyleSheet, View, Text, Animated, Image ,TouchableOpacity} from 'react-native';
import { BASE_COLOR, BG_GREY_OPACITY_3, BG_GREY_OPACITY_7, BG_GREY_OPACITY_9, BLUE, BLUE_2, GREEN_2, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale } from '../../../Constant/Scale';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { formatMonney } from '../../../Constant/Utils';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { styleElement } from '../../../Constant/StyleElement';


export default function ItemService(props) {


    const _handlePressImage = (_id) => {
        props?.pressImage(_id)
    }


    const _handlePressVideo = (_id) => {
        props?.pressVideo(_id)
    }


    const _handlePressDetail = () => {
        navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: props?.data?._id })
    }

    return (
        <> 
            <TouchableOpacity
                onPress={() => _handlePressDetail()}
                style={[styles.itemService]}>
                <View style={[styles.leftService]}>
                    {props?.data?.representationFileIdArr.length > 0 ?
                        <Image
                            style={{ width: _moderateScale(80), height: _moderateScale(80) }}
                            resizeMode="cover"
                            source={{ uri: (`${URL_ORIGINAL}/${props?.data?.representationFileArr[0]?.path}`) }} />
                        : <Image
                            style={{ width: _moderateScale(80), height: _moderateScale(80) }}
                            resizeMode="cover"
                            source={require('../../../Image/component/logoLinear.png')} />
                    }
                </View>
                <View style={[styles.rightService]}>
                    <Text style={[styles.nameService]}>
                        {props?.data?.name}
                    </Text>
                    <Text style={[styles.briefService]} numberOfLines={2}>
                        {props?.data?.description}
                    </Text>
                    <View style={[styles.bottomService]}>
                        <Text style={[styles.priceService]}>
                            {formatMonney(props?.data?.price)}
                        </Text>
                        <View style={[styles.actionService]}>
                            <TouchableOpacity
                                hitSlop={styleElement.hitslopSm}
                                onPress={() => _handlePressImage(props?.data?._id)}>
                                <Image
                                    style={{ width: _moderateScale(21), height: _moderateScale(21) }}
                                    resizeMode="cover"
                                    source={require('../../../Image/component/picture.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{marginLeft:_moderateScale(8)}}
                                hitSlop={styleElement.hitslopSm}
                                onPress={() => _handlePressVideo(props?.data?._id)}>
                                <Image
                                    style={{ width: _moderateScale(24), height: _moderateScale(21), marginLeft: _moderateScale(8) }}
                                    resizeMode="cover"
                                    source={require('../../../Image/component/video.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    itemService: {
        marginBottom: _moderateScale(12),
        marginHorizontal: _moderateScale(16),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: BG_GREY_OPACITY_3
    },
    leftService: {
        width: _moderateScale(80),
        height: _moderateScale(80),
        // backgroundColor: BASE_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        overflow: 'hidden'
    },
    rightService: {
        paddingBottom: _moderateScale(12),
        paddingHorizontal: _moderateScale(12),
        flex: 1
    },
    nameService: {
        fontSize: _moderateScale(16),
        color: SECOND_COLOR,
        ...stylesFont.fontNolanBold,
        marginBottom: _moderateScale(4)
    },
    briefService: {
        color: GREY,
        fontSize: _moderateScale(12),
        marginBottom: _moderateScale(4)
    },
    priceService: {
        fontSize: _moderateScale(16),
        ...stylesFont.fontDinTextProBold,
        color: GREEN_SUCCESS
    },
    bottomService: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionService: {
        flexDirection: 'row',
        paddingTop: _moderateScale(4)
    }
})