import { isEmpty } from 'lodash';
import React, { memo, useCallback } from 'react';
import { Image, Text, TouchableOpacity, View,ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import { navigation } from '../../../../rootNavigation';
import Avatar from '../../../Components/User/Avatar';
import * as Color from '../../../Constant/Color';
import { FROM_RECEIVER_ID } from '../../../Constant/Flag';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import ScreenKey from '../../../Navigation/ScreenKey';








const ListUsersOnline = memo((props) => {
    const listUserOnlineRedux = useSelector(state => state?.membersReducer?.listUserOnline)
    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)
    const membersRedux = useSelector(state => state.membersReducer)

    const [isTick, setIsTick] = React.useState(false)


    const _renderItemUserOnline = ({ item, index }) => {
        if (item == infoUserRedux._id) return
        let listUsersInAppTemp = [...membersRedux?.listMembersOfSystem]
        let result = listUsersInAppTemp.find(itemUserInApp => itemUserInApp._id == item);
        // console.log({ result });

        return (
            <TouchableOpacity onPress={() => {
                props.navigation.navigate(ScreenKey.CHATTING, { propsData: item, flag: FROM_RECEIVER_ID })
            }}>
                <Avatar url={result?.profile?.fileAvatar?.link} isOnline={true} name={result?.profile?.lastName} />
            </TouchableOpacity>
        )
    }

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);

    return (
        <>
            <View style={[styleElement.rowAliCenter, { width: _width, justifyContent: 'space-between', paddingHorizontal: _widthScale(16), marginTop: _heightScale(5) }]}>
                <Text style={[stylesFont.fontNolanBold, { fontSize: _widthScale(14) }]}>
                    Online
                </Text>
                <TouchableOpacity
                disabled
                style={[styleElement.paddingBtn, { marginHorizontal: _widthScale(8), opacity:0 }]}>
                    <Image
                        style={[sizeIcon.lg]}
                        source={require('../../../Icon/more.png')} />
                </TouchableOpacity>

            </View>
            <View style={{ marginTop: _moderateScale(8), flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: _widthScale(16) }}
                    data={!isEmpty(listUserOnlineRedux) ? listUserOnlineRedux : []}
                    keyExtractor={_awesomeChildListKeyExtractor}
                    renderItem={_renderItemUserOnline}
                />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: _widthScale(16) }}
                    data={!isEmpty(listUserOnlineRedux) ? listUserOnlineRedux : []}
                    keyExtractor={_awesomeChildListKeyExtractor}
                    renderItem={_renderItemUserOnline}
                /> */}
                <ScrollView
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: _widthScale(16) }}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        !isEmpty(listUserOnlineRedux) && listUserOnlineRedux.map((item, index) => {
                            if (item == infoUserRedux._id) return
                            let listUsersInAppTemp = [...membersRedux?.listMembersOfSystem]
                            let result = listUsersInAppTemp.find(itemUserInApp => itemUserInApp._id == item);

                            return (
                                <TouchableOpacity
                                    key={`item_${index}`}
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.CHATTING, { propsData: item, flag: FROM_RECEIVER_ID })
                                    }}>
                                    <Avatar url={result?.profile?.fileAvatar?.link} isOnline={true} name={result?.profile?.lastName} />
                                </TouchableOpacity>
                            )
                        })
                    }

                    {
                        !isEmpty(listUserOnlineRedux) && !isEmpty([...membersRedux?.listMembersOfSystem].filter(item => listUserOnlineRedux.find(itemFind => itemFind !== item._id))) &&
                        ([...membersRedux?.listMembersOfSystem].filter(itemFilter => !listUserOnlineRedux.includes(itemFilter._id))).splice(0, 10).map((item, index) => {
                            if (item == infoUserRedux._id) return
                            // let listUsersInAppTemp = [...membersRedux?.listMembersOfSystem]
                            // let result = listUsersInAppTemp.find(itemUserInApp => itemUserInApp._id == item);

                            return (
                                <TouchableOpacity
                                    key={`item_${index}`}
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.CHATTING, { propsData: item._id, flag: FROM_RECEIVER_ID })
                                    }}>
                                    <Avatar url={item?.profile?.fileAvatar?.link} isOnline={false} name={item?.profile?.lastName} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ paddingHorizontal: _widthScale(16), marginTop: _moderateScale(12) }}>
                <View style={{ width: "100%", height: _moderateScale(0.5), backgroundColor: Color.BG_GREY_OPACITY_5 }} />
            </View>
        </>

    );
});



export default ListUsersOnline;