import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import * as Color from '../../Constant/Color';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
import { getLastedMessage } from '../../Redux/Action/MessageAction';
import { stylesFont } from '../../Constant/Font';
import AsyncStorage from '@react-native-community/async-storage';
import keychain from "src/utils/keychain";


const MessageTabIcon = props => {
    const dispatch = useDispatch()

    const stateRedux = useSelector(state => state.userReducer)
    const listLastedMessagesRedux = useSelector(state => state?.messageReducer?.listLastedMessages)
    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const listLastedMessageRedux = useSelector(state => state.messageReducer?.listLastedMessages)

    const [countMessageNotRead, setCountMessageNotRead] = useState(0)

    useEffect(() => {

        _getLastedMessage()

    }, [infoUserRedux])

    const _getLastedMessage = async () => {
        let tokenSTR = keychain.getTokens().accessToken;

        if (tokenSTR && infoUserRedux?._id) {
            dispatch(getLastedMessage({
                sort: {
                    latestMessageTime: -1
                },
                limit: 50,
                page: 1
            }))
        }
    }

    useEffect(() => {
        if (!isEmpty(listLastedMessageRedux)) {
            let countTemp = 0

            listLastedMessageRedux?.map((item, index) => {
                if (!item?.latestMessage?.isPartnerSeen) {
                    countTemp += 1;
                }
            })
            setCountMessageNotRead(countTemp)

        }else{
            setCountMessageNotRead(0)
        }
    }, [listLastedMessageRedux])


    return (
        <>
            <ImageBackground
                style={[sizeIcon.lxlg]}
                source={
                    props.focused ?
                        require('../../NewIcon/a_chat.png')
                        :
                        require('../../NewIcon/i_chat.png')
                }
            >
                {
                    countMessageNotRead ?
                        <View style={{
                            backgroundColor: Color.RED,
                            position: 'absolute',
                            right: -_moderateScale(4),
                            top: -_moderateScale(4),
                            // top: 0,
                            width: _moderateScale(8 * 2),
                            height: _moderateScale(8 * 2),
                            borderRadius: _moderateScale(8),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ ...stylesFont.fontNolanBold, color: Color.WHITE, fontSize: _moderateScale(12), bottom: _moderateScale(1) }}>
                                {countMessageNotRead}
                            </Text>
                        </View>
                        :
                        <></>
                }
                {/* {
                    !isEmpty(listLastedMessagesRedux) && listLastedMessagesRedux[0]?.viewerIdArr?.find(itemFind => itemFind == infoUserRedux?._id) ?
                        <>
                        </>
                        :
                        <View style={styles.dotNewNotifi} />
                } */}
            </ImageBackground>

        </>
    );
};

const styles = StyleSheet.create({
    dotNewNotifi: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: Color.RED,
        position: 'absolute',
        right: 0,
        top: 0

    }
})

export default MessageTabIcon;
