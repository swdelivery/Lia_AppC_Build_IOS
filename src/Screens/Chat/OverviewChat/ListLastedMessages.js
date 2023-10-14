import { isEmpty } from 'lodash';
import React, { memo, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { navigation } from '../../../../rootNavigation';
import ItemMessage from '../../../Components/Message/ItemMessage';
import * as Color from '../../../Constant/Color';
import { FROM_GROUP_CHAT_ID } from '../../../Constant/Flag';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale } from '../../../Constant/Scale';
import ScreenKey from '../../../Navigation/ScreenKey';
// ACTION 
import { getMoreLastedMessage } from '../../../Redux/Action/MessageAction';







const ListLastedMessages = memo((props) => {
    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state.infoUserReducer)
    const messageRedux = useSelector(state => state.messageReducer)

    const [loadingMoreMessage, setLoadingMoreMessage] = useState(false)

    const _handleGetMoreLastedMessages = () => {
        setLoadingMoreMessage(true)
        dispatch(getMoreLastedMessage(messageRedux?.listLastedMessages[messageRedux?.listLastedMessages?.length - 1]?._id, setLoadingMoreMessage))
    }

    return (
        <>
            {
                !isEmpty(messageRedux?.listLastedMessages) && messageRedux?.listLastedMessages.map((item, index) => {
                    return (
                        <ItemMessage
                            key={index}
                            navigateToChatting={() => {
                                navigation.navigate(ScreenKey.CHATTING, { propsData: item, flag: FROM_GROUP_CHAT_ID })
                            }}
                            url={'https://dienmaylucky.com/wp-content/uploads/2019/04/84241059_189132118950875_4138507100605120512_n.jpg'}
                            isOnline={Math.floor((Math.random() * 3) + 1) == 2 ? false : true}
                            // isSeen={index > 2 ? true : false}
                            isSeen={item?.isPartnerSeen}
                            data={item}
                        />
                    )
                })
            }
            <TouchableOpacity
                disabled={loadingMoreMessage}
                onPress={_handleGetMoreLastedMessages}
                style={{
                    paddingVertical: _moderateScale(8 * 3),
                    marginLeft: _moderateScale(8 * 3.5),
                    flexDirection: 'row'
                }}>
                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.GREY_FOR_TITLE }, loadingMoreMessage ? { opacity: 0.5 } : {}]}>
                    Tải thêm
                    </Text>
                {
                    loadingMoreMessage ?
                        <ActivityIndicator style={{ marginLeft: _moderateScale(8) }} />
                        :
                        <>
                        </>
                }
            </TouchableOpacity>
        </>

    );
});



export default ListLastedMessages;