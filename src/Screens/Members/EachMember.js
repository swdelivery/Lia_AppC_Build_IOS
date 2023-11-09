import { isEmpty } from 'lodash';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import Avatar from '../../Components/User/Avatar';
import { FROM_RECEIVER_ID } from '../../Constant/Flag';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
import ScreenKey from '../../Navigation/ScreenKey';
import { styleElement } from '../../Constant/StyleElement';



const EachMember = memo((props) => {

    const membersRedux = useSelector(state => state.membersReducer)
    // const infoUserRedux = useSelector(state => state.infoUserReducer)

    return (
        <View style={[styles.avatarAndName]}>
            {/* <Text>
                {props?.item?.userName} {randomStringFixLengthCode(10)}
            </Text> */}

            <View style={{ alignSelf: 'flex-start' }}>
                <Avatar url={props?.item?.profile?.fileAvatar?.link}
                    isOnline={!isEmpty(membersRedux.listUserOnline) && membersRedux.listUserOnline.find(item => item == props?.item?._id)}
                    name={props?.item?.profile?.lastName}
                    notName />
            </View>
            <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(16), marginHorizontal: _moderateScale(8 * 2) }]}>
                {
                    `${props?.item?.profile?.firstName} ${props?.item?.profile?.lastName}`
                }
            </Text>

            <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
            onPress={()=>{
                navigation.goBack()
                navigation.navigate(ScreenKey.CHATTING, { propsData: props.item._id, flag: FROM_RECEIVER_ID })
            }}
            style={{
                paddingHorizontal:_moderateScale(8),
                paddingVertical:_moderateScale(8),
                // backgroundColor:BG_GREY_OPACITY_3,
                borderRadius:_moderateScale(8)
            }}>
                {/* <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color:GREY_FOR_TITLE }]}>
                    Nhắn tin
                </Text> */}
                <Image 
                style={sizeIcon.lg}
                source={require('../../Icon/i_chatt.png')}/>
            </TouchableOpacity>

        </View>
    );
});

const styles = StyleSheet.create({
    avatarAndName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:_moderateScale(8*2),
        marginTop:_moderateScale(8*2)
    }
})

export default EachMember;