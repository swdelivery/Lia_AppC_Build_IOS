import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width } from '../../../Constant/Scale'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { navigation } from 'rootNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import { partnerConversationStartChat } from '@Redux/Action/DoctorAction'
import { FROM_GROUP_CHAT_ID } from '@Constant/Flag'

const BottomAction = memo((props) => {

    const { infoDoctor } = props

    const _handlePartnerConversationStartChat = async() => {
        let result = await partnerConversationStartChat({
            "type": "treatment",
            "doctorId": infoDoctor?.userId
        })
        if(result?.isAxiosError)return
        navigation.navigate(ScreenKey.CHATTING, { propsData: {_id:result?.data?.data?._id }, flag: FROM_GROUP_CHAT_ID })
    }   

    return (
        <View style={styles.container}>
            <View style={{
                width: _width,
                height: _moderateScale(8 * 8),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: _moderateScale(8 * 3),
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity
                 onPress={() => {
                    Alert.alert("Tính năng đang phát triển")
                }}
                style={{ alignItems: 'center' }}>
                    <Image style={styles.care} source={require('../../../Image/care.png')} />
                    <Text>
                        Yêu cầu tư vấn
                    </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.CREATE_BOOKING, { choiceDoctor: infoDoctor })
                        }}
                        style={styles.bookingBtn}>
                        <Text style={styles.bookingBtn__text}>
                            Đặt Hẹn
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: 8 * 2 }} />

                    <TouchableOpacity
                    onPress={_handlePartnerConversationStartChat}
                    style={styles.chatBtn}>
                        <Text style={styles.chatBtn__text}>
                            Trò Chuyện
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
})

export default BottomAction

const styles = StyleSheet.create({
    chatBtn__text: {
        fontSize: _moderateScale(14),
        color: 'white',
        fontWeight: 'bold'
    },
    chatBtn: {
        width: _moderateScale(8 * 13),
        height: _moderateScale(8 * 5),
        borderWidth: 2,
        borderRadius: _moderateScale(8 * 2),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1E463E',
        backgroundColor: '#1E463E'
    },
    bookingBtn__text: {
        fontSize: _moderateScale(14),
        color: '#1E463E',
        fontWeight: 'bold'
    },
    bookingBtn: {
        width: _moderateScale(8 * 13),
        height: _moderateScale(8 * 5),
        borderWidth: 1,
        borderRadius: _moderateScale(8 * 2),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1E463E'
    },
    care: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(8 * 3)
    },
    container: {
        width: _width,
        backgroundColor: 'white',
        paddingBottom: _moderateScale(8 * 3),
        borderTopWidth: .5,
        borderColor: 'rgba(0,0,0,.2)'
    }
})