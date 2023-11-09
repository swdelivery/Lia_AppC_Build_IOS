import { isEmpty } from 'lodash';
import React, { memo, useState, useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, AppState } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { navigation } from '../../../../rootNavigation';
import ItemLastedMessage from './Components/ItemLastedMessage';
import * as Color from '../../../Constant/Color';
import { FROM_GROUP_CHAT_ID } from '../../../Constant/Flag';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale } from '../../../Constant/Scale';
import ScreenKey from '../../../Navigation/ScreenKey';
// ACTION 
import { getMoreLastedMessage } from '../../../Redux/Action/MessageAction';
import { getLastedMessage } from '../../../Redux/Action/MessageAction';





const ListLastedMessages = memo((props) => {
    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state.infoUserReducer)
    const messageRedux = useSelector(state => state.messageReducer)

    const [loadingMoreMessage, setLoadingMoreMessage] = useState(false)

    const [appStateVisible, setAppStateVisible] = useState("");

    const _handleGetMoreLastedMessages = () => {
        setLoadingMoreMessage(true)
        dispatch(getMoreLastedMessage(messageRedux?.listLastedMessages[messageRedux?.listLastedMessages?.length - 1]?._id, setLoadingMoreMessage))
    }


    useEffect(() => {
        dispatch(getLastedMessage({
            sort:{
                latestMessageTime: -1
            },
            limit: 50,
            page: 1
        }))


        AppState.addEventListener("change", async (state) => {
            if (state == 'active') {
                setAppStateVisible("active")

            } else {
                setAppStateVisible('inActive')
            }
        });

        return () => {
            AppState.removeEventListener("change", () => {
                // alert('out')
            });
        };

    }, [])


    useEffect(() => {
        (async () => {
            if (appStateVisible == "active") {
                dispatch(getLastedMessage({
                    sort:{ 
                        latestMessageTime: -1
                    },
                    limit: 50,
                    page: 1 
                }))
            }
        })()
    }, [appStateVisible])


    return (
        <>
            {
                !isEmpty(messageRedux?.listLastedMessages) && messageRedux?.listLastedMessages.map((item, index) => {
                    if(item?.isActive == true){
                        return (
                            <ItemLastedMessage
                                key={index}
                                navigateToChatting={() => {
                                    navigation.navigate(ScreenKey.CHATTING, { propsData: item, flag: FROM_GROUP_CHAT_ID })
                                }}
                                // url={'https://dienmaylucky.com/wp-content/uploads/2019/04/84241059_189132118950875_4138507100605120512_n.jpg'}
                                // isOnline={Math.floor((Math.random() * 3) + 1) == 2 ? false : true}
                                isSeen={item?.latestMessage?.isPartnerSeen}
                                data={item}
                            />
                        )
                    }
                })
            }
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
        </>

    );
});



export default ListLastedMessages;