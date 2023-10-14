import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { _moderateScale, _width } from '../../../Constant/Scale'
import IconCalendar from '../../../SGV/calendar.svg'
import IconChatWhite from '../../../SGV/chatWhite.svg'
import IconPhoneWhite from '../../../SGV/phoneWhite.svg'

const BottomAction = memo(() => {
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
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <IconCalendar
                        height={_moderateScale(8 * 3)}
                        width={_moderateScale(8 * 3)} />
                    <Text style={{
                        fontSize:_moderateScale(13),
                        fontWeight:'500',
                        marginTop:4
                    }}>
                        Đặt Hẹn
                    </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.bookingBtn}>
                        <IconPhoneWhite
                            height={_moderateScale(8 * 3)}
                            width={_moderateScale(8 * 3)} />
                        <View style={{ width: _moderateScale(8) }} />
                        <Text style={styles.bookingBtn__text}>
                            Liên Hệ
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: 8 * 2 }} />

                    <TouchableOpacity style={styles.chatBtn}>
                        <IconChatWhite
                            height={_moderateScale(8 * 3)}
                            width={_moderateScale(8 * 3)} />
                        <View style={{ width: _moderateScale(0) }} />
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
        width: _moderateScale(8 * 16),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 2),
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: '#1E463E',
        backgroundColor: '#876947',
        flexDirection: 'row'
    },
    bookingBtn__text: {
        fontSize: _moderateScale(14),
        color: 'white',
        fontWeight: 'bold'
    },
    bookingBtn: {
        width: _moderateScale(8 * 15),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 2),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1E463E',
        backgroundColor: '#B99A60',
        flexDirection: 'row'
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