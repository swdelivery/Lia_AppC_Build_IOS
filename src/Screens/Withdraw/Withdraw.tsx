import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import { IconRightWhite, IconWallet } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import Text from '@Components/Text'
import { BASE_COLOR, BLUE_FB, BORDER_COLOR, PRICE_ORANGE, RED, WHITE } from '@Constant/Color'
import { stylesFont } from "@Constant/Font"
import { sizeIcon } from '@Constant/Icon'
import { _moderateScale } from '@Constant/Scale'
import { formatMonney } from '@Constant/Utils'
import ScreenKey from '@Navigation/ScreenKey'
import { getWalletState } from '@Redux/wallet/selectors'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

const Withdraw = () => {
    const { navigate } = useNavigate()
    const { data: wallet } = useSelector(getWalletState)

    const [valueMoney, setValueMoney] = useState('')
    const [valueDescription, setValueDescription] = useState('')


    const _handleOnchangeText = (value) => {
        setValueMoney(value.split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    }

    return (
        <Screen safeBottom>
            <LiAHeader safeTop title={"Yêu cầu rút tiền"} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Column
                        gap={8}
                        margin={8 * 2}>
                        <Row gap={8 * 2}>
                            <IconWallet />
                            <Row gap={8}>
                                <Text
                                    size={16}
                                    weight='bold'>
                                    Hoa hồng khả dụng:
                                </Text>
                                <Text
                                    color={PRICE_ORANGE}
                                    size={16}
                                    weight='bold'>
                                    {formatMonney(wallet?.commissionAmount)} VND
                                </Text>
                            </Row>
                        </Row>
                    </Column>

                    <Column
                        gap={8}
                        marginTop={0}
                        margin={8 * 2}>
                        <Text color={BASE_COLOR}>
                            Nhập số tiền muốn rút <Text color={RED}>*</Text>
                        </Text>
                        <TextInput
                            onChangeText={(e) => _handleOnchangeText(e)}
                            value={valueMoney}
                            keyboardType={'number-pad'}
                            placeholder='0'
                            style={styles.textInput} />
                    </Column>

                    <Column
                        gap={8}
                        marginTop={0}
                        margin={8 * 2}>
                        <Text color={BASE_COLOR}>
                            Ghi chú
                        </Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                onChangeText={(e) => setValueDescription(e)}
                                value={valueDescription}
                                placeholder={"Nhập ghi chú"}
                                multiline />
                        </View>
                    </Column>

                    <Column
                        gap={8}
                        marginTop={0}
                        margin={8 * 2}>
                        <Text color={BASE_COLOR}>
                            Thông tin ngân hàng của bạn <Text color={RED}>*</Text>
                        </Text>

                        <Text
                            color={RED}
                            fontStyle='italic'>
                            * Bạn chưa có thông tin ngân hàng, nhấn vào bên dưới để cập nhật trước khi rút tiền
                        </Text>

                        <TouchableOpacity
                            onPress={navigate(ScreenKey.UPDATE_PARTNER_INFO_BANK)}
                            style={styles.btnUpdateInfoBank}>
                            <Row gap={8}>
                                <Text
                                    weight='bold'
                                    color={WHITE}>
                                    Cập nhật ngay
                                </Text>
                                <IconRightWhite style={sizeIcon.xxs} />
                            </Row>
                        </TouchableOpacity>

                    </Column>

                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    )
}

export default Withdraw

const styles = StyleSheet.create({
    btnUpdateInfoBank: {
        paddingHorizontal: 8 * 2,
        paddingVertical: 8,
        backgroundColor: BLUE_FB,
        alignSelf: 'flex-start',
        borderRadius: 4
    },
    inputContainer: {
        minHeight: _moderateScale(8 * 10),
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: _moderateScale(8),
        padding: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 1.5),
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: BORDER_COLOR,
        padding: 8 * 2,
        fontSize: 18,
        color: PRICE_ORANGE,
        ...stylesFont.fontNolanBold
    }
})
