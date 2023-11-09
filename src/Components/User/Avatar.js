import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import FastImage from '../../Components/Image/FastImage';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale } from '../../Constant/Scale';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';


const Avatar = (props) => {
    const [isLoadingImageDone, setIsLoadingimageDone] = useState(false)

    useEffect(() => {

    }, [])
    const _loadDone = () => {
        setIsLoadingimageDone(true)
    }

    return (
        <View style={[styles.container, props.notName && { width: 'auto', marginRight: 0 }]}>
            <View style={[styles.avatar, props.style && props.style]}>

                <FastImage
                    style={[{ width: "100%", height: '100%', borderRadius: _moderateScale(30)}]}
                    uri={props.url ? `${URL_ORIGINAL}${props.url}` : URL_AVATAR_DEFAULT}
                    onLoadEnd={_loadDone}
                /> 
                {/* <Animated.Image
                    resizeMode={'cover'}
                    style={{ width: "100%", height: '100%', borderRadius: _moderateScale(30), borderWidth: _moderateScale(1), borderColor: Color.BG_GREY_OPACITY }}
                    source={props.url ? { uri: `${URL_ORIGINAL}${props.url}` } : { uri: URL_AVATAR_DEFAULT }}
                    onLoadEnd={_loadDone}
                /> */}

                {
                    !isLoadingImageDone &&
                    <View style={{ position: 'absolute', alignSelf: 'center' }}>
                        <SkeletonPlaceholder >
                            <SkeletonPlaceholder.Item position={'absolute'} height={_moderateScale(60)} borderRadius={_moderateScale(30)} width={_moderateScale(60)} alignSelf={'center'} />
                        </SkeletonPlaceholder>
                    </View>
                }
                {
                    props.isOnline &&
                    <>
                        {
                            isLoadingImageDone &&
                            <View style={{ position: 'absolute', zIndex: 1, bottom: 0, right: 0, width: _moderateScale(18), height: _moderateScale(18), borderWidth: _moderateScale(3), borderColor: Color.WHITE, borderRadius: _moderateScale(9), backgroundColor: Color.ONLINE }} />
                        }
                    </>
                }

            </View>
            {
                !props.notName &&
                <>
                    {
                        !isLoadingImageDone ?
                            <SkeletonPlaceholder >
                                <SkeletonPlaceholder.Item marginTop={_moderateScale(8)} height={_moderateScale(10)} borderRadius={_moderateScale(5)} width={_moderateScale(40)} alignSelf={'center'} />
                            </SkeletonPlaceholder>
                            :
                            <Text
                                numberOfLines={1}
                                style={[stylesFont.fontNolan500, {
                                    width: "100%",
                                    textAlign: 'center',
                                    fontSize: _moderateScale(12),
                                    marginTop: _moderateScale(8)
                                }]}>
                                {props.name}
                                {/* {randomStringFixLengthCode(4)} */}
                            </Text>
                    }
                </>
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: _widthScale(10),
        alignItems: 'center',
        width: _moderateScale(80)
    },
    avatar: {
        width: _moderateScale(56),
        height: _moderateScale(56),
        borderRadius: _moderateScale(28),
        backgroundColor: Color.BG_GREY_OPACITY_5
    }
})

export default memo(Avatar);