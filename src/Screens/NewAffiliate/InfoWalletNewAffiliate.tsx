import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import { IconCashIn, IconCommision, IconDollars } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { BASE_COLOR, BLUE_FB, BORDER_COLOR, GREY, GREY_FOR_TITLE, PRICE_ORANGE, RED, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _moderateScale, _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import ScreenKey from '@Navigation/ScreenKey'
import { getWallet } from '@Redux/wallet/actions'
import { getWalletState } from '@Redux/wallet/selectors'
import moment from 'moment'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocused, useNavigate } from 'src/Hooks/useNavigation'

const InfoWalletNewAffiliate = () => {
    const { navigate } = useNavigate()
    const dispatch = useDispatch()
    const { data: wallet } = useSelector(getWalletState)

    useFocused(() => {
        dispatch(getWallet.request())
    })

    const _renderItem = ({ item, index }) => {
        return (
            <Row
                gap={8 * 2}
                borderColor={BORDER_COLOR}
                borderBottomWidth={1}
                padding={8 * 2}>

                <Column
                    width={8 * 6}
                    height={8 * 6}
                    borderRadius={8 * 6 / 2}
                    borderWidth={1}
                    borderColor={BASE_COLOR}
                    justifyContent='center'
                    alignItems='center'>
                    <IconCommision style={sizeIcon.lxlg} />
                </Column>

                <Column
                    flex={1}>
                    <Text
                        numberOfLines={1}
                        color={BLUE_FB}
                        weight='bold'>
                        {item?.paymentFor}
                    </Text>
                    <Text
                        size={12}
                        numberOfLines={1}
                        color={GREY}
                        weight='regular'>
                        {moment(item?.created).format("DD/MM/YYYY")}
                    </Text>
                    <Text
                        numberOfLines={1}
                        color={PRICE_ORANGE}
                        weight='bold'>
                        {item?.status == 'increase' ? "+" : "-"} {formatMonney(item?.money)}
                    </Text>
                </Column>

            </Row>
        )
    }

    return (
        <Screen>
            <LiAHeader safeTop title='Ví của tôi' />
            <Column
                padding={8 * 2}
                paddingBottom={8 * 5}
                backgroundColor={BASE_COLOR}>
                <Row>
                    <Column flex={3.5}>
                        <Text
                            weight='bold'
                            color={WHITE}
                            size={16}>
                            Tổng tiền
                        </Text>
                        <Text
                            weight='bold'
                            color={WHITE}
                            size={24}>
                            {formatMonney(wallet?.depositAmount + wallet?.commissionAmount)} vnd
                        </Text>
                    </Column>
                    <Row
                        justifyContent='flex-end'
                        gap={8 * 2}
                        flex={2.5}>
                        <Column>
                            <View style={styles.containerBtnCashIn}>
                                <TouchableOpacity
                                    onPress={navigate(ScreenKey.RECHARGE_TO_WALLET)}
                                    style={styles.btnCashIn}>
                                    <View style={{ transform: [{ rotate: '90deg' }] }}>
                                        <IconCashIn style={sizeIcon.lg} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text
                                weight='bold'
                                color={WHITE}>
                                Nạp tiền
                            </Text>
                        </Column>
                        <Column>
                            <View style={styles.containerBtnCashIn}>
                                <TouchableOpacity
                                    onPress={navigate(ScreenKey.WITH_DRAW)}
                                    style={styles.btnCashIn}>
                                    <IconDollars style={sizeIcon.llg} />
                                </TouchableOpacity>
                            </View>
                            <Text
                                weight='bold'
                                color={WHITE}>
                                Rút tiền
                            </Text>
                        </Column>
                    </Row>
                </Row>

                <Row
                    gap={8 * 2}
                    marginTop={8 * 2}>
                    <Text
                        weight='bold'
                        color={BLUE_FB}>
                        Tiền nạp: {formatMonney(wallet?.depositAmount)} vnd
                    </Text>
                    <Text
                        weight='bold'
                        color={RED}>
                        Hoa hồng: {formatMonney(wallet?.commissionAmount)} vnd
                    </Text>

                </Row>

            </Column>

            <Column
                backgroundColor={WHITE}
                flex={1}>
                <View style={styles.containerBarReport} >
                    <Text
                        weight='bold'
                        color={GREY_FOR_TITLE}>
                        Thống kê nguồn tiền
                    </Text>
                </View>
                <Column height={8 * 4} />
                <FlatList
                    data={wallet?.walletHistoryArr}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => item?.id}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ height: 200 }} />
                        )
                    }}
                />

            </Column>
        </Screen>
    )
}

export default InfoWalletNewAffiliate

const styles = StyleSheet.create({
    containerBarReport: {
        width: _width, height: _moderateScale(8 * 6), backgroundColor: WHITE,
        borderTopLeftRadius: _moderateScale(8 * 2), borderTopRightRadius: _moderateScale(8 * 2),
        top: -_moderateScale(8 * 2.5),
        position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    btnCashIn: {
        backgroundColor: WHITE,
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5) / 2,
        ...styleElement.centerChild
    },
    containerBtnCashIn: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(8 * 6) / 2,
        borderWidth: 2,
        ...styleElement.centerChild,
        borderColor: WHITE
    }
})