import Column from '@Components/Column'
import { IconLocation, IconOclock } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BLACK, BORDER_COLOR, GREY, GREY_FOR_TITLE, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import { openActionSheetBottom } from '@Redux/modal/actions'
import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { navigation } from 'rootNavigation'
import StatusBooking from './StatusBooking'

const CardBooking = () => {
    const dispatch = useDispatch()

    const _handleActionSheetBottom = useCallback(() => {
        dispatch(openActionSheetBottom({
            flag: true,
            data: {}
        }))
    }, [])

    const _handleGoDetailBooking = useCallback(() => {
        navigation.navigate(ScreenKey.DETAIL_BOOKING)
    }, [])

    return (
        <TouchableOpacity
            onPress={_handleGoDetailBooking}
            activeOpacity={.8}
            style={[styles.container, shadow]}>
            <Row gap={8 * 2} alignItems={'flex-start'} style={styles.avatar__title}>
                <Image style={styles.avatar} />
                <Column style={{ flex: 1 }} gap={4}>
                    <Text numberOfLines={1} color={GREY_FOR_TITLE} size={14} weight='bold'>
                        Nhấn Mí T-2022
                    </Text>
                    <Text numberOfLines={1} color={BLACK} size={14} weight='regular'>
                        Chi nhánh 3/2 Tphcm
                    </Text>
                    <StatusBooking status='WAITING' />
                </Column>
                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={_handleActionSheetBottom}
                    style={styles.action}>
                    <Row gap={4}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </Row>
                </TouchableOpacity>
            </Row>
            <View style={styles.horizonLine} />
            <Column gap={8} style={styles.infoBottom}>
                <Row gap={8}>
                    <IconOclock width={8 * 2} height={8 * 2} />
                    <Text>
                        17:00 - 18:00 | 30/10/2023
                    </Text>
                </Row>
                <Row gap={8}>
                    <IconLocation width={8 * 2} height={8 * 2} />
                    <Text>
                        249 Đường 3/2, P.12, Quận 10, Tp.HCM
                    </Text>
                </Row>
            </Column>
        </TouchableOpacity>
    )
}

export default CardBooking

const styles = StyleSheet.create({
    infoBottom: {
        padding: 8 * 2,
        paddingVertical: 8
    },
    horizonLine: {
        width: '100%',
        height: 1,
        backgroundColor: BORDER_COLOR
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: GREY
    },
    action: {
        marginTop: 8
    },
    avatar__title: {
        padding: 8 * 2,
        paddingTop: 8
    },
    avatar: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: 4
    },
    container: {
        marginHorizontal: _moderateScale(8 * 2),
        // borderWidth: 1,
        borderRadius: 8,
        borderColor: BORDER_COLOR,
        backgroundColor: WHITE
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,

    elevation: 2
}