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
import moment from 'moment';


export default function ItemNews(props) {
    const _handlePressDetail = () => {
        navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: props?.data?._id })
    }

    return (
        <> 
            <TouchableOpacity
                onPress={() => _handlePressDetail()}
                style={[styles.itemService]}>
                <View style={[styles.leftService]}>
                    {props?.data?.representationFileIdArr.length > 0 ?
                        <Image
                            style={{ width: _moderateScale(72), height: _moderateScale(72), borderRadius: _moderateScale(4) }}
                            resizeMode="cover"
                            source={{ uri: (`${URL_ORIGINAL}/${props?.data?.representationFileArr[0]?.path}`) }} />
                        : <Image
                            style={{ width: _moderateScale(72), height: _moderateScale(72), borderRadius: _moderateScale(4)  }}
                            resizeMode="cover"
                            source={require('../../../Image/component/logoLinear.png')} />
                    }
                </View>
                <View style={[styles.rightService]}>
                    <Text style={[styles.nameService]} numberOfLines={2}>
                        {props?.data?.title}
                    </Text>
                    <Text style={{...stylesFont.fontNolan, 
                        marginBottom: _moderateScale(4),
                        color: GREY,
                        fontSize: _moderateScale(11)}}>
                            {moment().format('DD-MM-YYYY')}
                    </Text>
                    <Text style={[styles.briefService]} numberOfLines={2}>
                        {props?.data?.description}
                    </Text>
                    <View style={[styles.bottomService]}>
                      
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