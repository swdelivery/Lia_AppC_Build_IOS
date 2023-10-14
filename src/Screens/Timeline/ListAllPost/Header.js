import { includes } from 'lodash';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BG_GREY_OPACITY_5, GREY_FOR_TITLE, RED, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import ScreenKey from '../../../Navigation/ScreenKey';
import TabRightNotifi from './TabRightNotifi';



const Header = memo((props) => {
    const [showTabRightNotifi, setShowTabRightNotifi] = useState(false)

    const notificationRedux = useSelector(state => state.notificationReducer)
    const infoUserRedux = useSelector(state => state.infoUserReducer)


    const _setShowTabRightNotifi = useCallback((flag) => {
        setShowTabRightNotifi(flag)
    }, [])

    const modal = useMemo(() => {
        return (
            <TabRightNotifi
                setShowTabRightNotifi={_setShowTabRightNotifi}
                showTabRightNotifi={showTabRightNotifi} />
        )
    }, [showTabRightNotifi])

    // useEffect(() => {

    //     let x = notificationRedux.listMyNotificationsForPost.find(itemFind => {
    //         return (!includes(itemFind.viewerIdArr, infoUserRedux.infoUser._id))
    //     })

    //     console.log({ x });


    // }, [notificationRedux])

    return (
        <>
            {
                modal
            }

            <View style={[styleElement.rowAliCenter, styles.header, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(16), zIndex: 1 },{borderBottomWidth:0.5, borderBottomColor:BG_GREY_OPACITY_5}]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.MODAL_CREATE_NEW_FEED)
                    }} 
                    style={[{
                        overflow: 'hidden', width: _moderateScale(8 * 3.25), height: _moderateScale(8 * 3.25), borderRadius: _moderateScale(8 * 3.25 / 2), alignItems: 'center', justifyContent: 'center', backgroundColor: WHITE
                    }, shadow]}>
                    {/* <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={gradient.color}
                style={gradient.container}> */}
                    <Image
                        style={[sizeIcon.lg]}
                        source={require('../../../Icon/iconPlus_base.png')} />
                    {/* </LinearGradient> */}
                </TouchableOpacity>
                <Text
                    numberOfLines={2}
                    style={[stylesFont.fontNolan500, styles.header__title]}>
                    Hoạt động
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setShowTabRightNotifi(true)
                        // Store.dispatch({ 
                        //     type: ActionType.TAB_RIGHT_NOTIFI_TASK, 
                        //     payload: {
                        //         flag: true
                        //     }
                        // })
                    }}
                    style={{ padding: _moderateScale(4) }}>
                    <ImageBackground
                        style={[sizeIcon.lg]}
                        source={require('../../../Icon/notifiGrey.png')} >
                        {
                            notificationRedux?.listMyNotificationsForPost?.find(itemFind => {
                                return (!includes(itemFind.viewerIdArr, infoUserRedux.infoUser._id))
                            }) ?
                                <View style={styles.dotNewNotifi} />
                                :
                                <>
                                </>
                        }
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </>
    );
});


const styles = StyleSheet.create({
    dotNewNotifi: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: RED,
        position: 'absolute',
        right: _moderateScale(2),
        top: _moderateScale(2)
    },
    header__title: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE,
        width: _moderateScale(250),
        textAlign: 'center',
        // backgroundColor:'red'
    },
    header: {
        justifyContent: 'center',
        // alignItems: 'flex-end',
        width: _width,
        // height: _moderateScale(45),
        backgroundColor: WHITE,
        height: _moderateScale(8 * 6),
        paddingVertical: _moderateScale(8)
    },
})

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.68,

    elevation: 1.5
}



export default Header;