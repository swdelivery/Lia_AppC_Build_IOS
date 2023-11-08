import _isEmpty from 'lodash/isEmpty';
import React, { memo, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
// REDUX
import { useDispatch } from "react-redux";
import { navigation } from '../../../../rootNavigation';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { WHITE } from '../../../Constant/Color';
import { FROM_GROUP_CHAT_ID } from '../../../Constant/Flag';
import GlobalStore from '../../../Constant/GlobalStore';
import { _heightScale } from '../../../Constant/Scale';
import ScreenKey from '../../../Navigation/ScreenKey';
import { getConversationByIdForPartner, getDataPartnerMessage } from '../../../Redux/Action/MessageActionV2';
import { getStringeeToken } from '../../../Redux/Action/StringeeAction';
import * as ActionType from "../../../Redux/Constants/ActionType";
import Store from "../../../Redux/store";
import Header from './Header';
import InputChat from './InputChat';
import ListMessages from './ListMessages';








const index = memo((props) => {

    const dispatch = useDispatch()

    const clientRef = useRef('client')
    const stringeeCall2Ref = useRef('stringeeCall2')


    const [clientId, setClientId] = useState(null)

    const [hasReceivedLocalStream, setHasReceivedLocalStream] = useState(false)
    const [hasReceivedRemoteStream, setHasReceivedRemoteStream] = useState(false)

    const [callId, setCallId] = useState(null)

    const [showBtnAnswer, setShowBtnAnswer] = useState(false)

    useEffect(() => {

        // _getStringeeToken()

        if (props?.route?.params?.flag == FROM_GROUP_CHAT_ID) {
            fetchAPIGroupChatByCode(props.route.params.propsData._id)
        }

        return () => {
            Store.dispatch({
                type: ActionType.CLEAR_DATA_CURR_CHATTING,
                payload: null
            })
            GlobalStore.xyzc = null
        }

    }, [])

    const _getStringeeToken = async () => {
        let result = await getStringeeToken()
        // console.log();
        if (result?.isAxiosError) return;
        // console.log({ clientRef });

        await clientRef?.current?.connect(result?.data?.data?.token);
        console.log({ clientId: clientRef?.current?.getId() });
        setClientId(clientRef?.current?.getId())

    }




    const fetchAPIGroupChatByCode = async (conversationId) => {

        if (!_isEmpty(conversationId)) {
            let resultGetConversationByIdForPartner = await getConversationByIdForPartner(
                conversationId
            )
            if (resultGetConversationByIdForPartner.isAxiosError) return

            Store.dispatch({
                type: ActionType.SAVE_INFO_CURR_CHATTING,
                payload: {
                    data: resultGetConversationByIdForPartner?.data?.data
                }
            })

            let resultGetDataPartnerMessage = await getDataPartnerMessage({
                condition: {
                    conversationId: conversationId,
                },
                // sort: {
                //     created: -1
                // },
                limit: 20,
                page: 1
            })
            if (resultGetDataPartnerMessage.isAxiosError) return

            Store.dispatch({
                type: ActionType.SAVE_LIST_MESSAGE_CURR_CHATTING,
                payload: {
                    data: resultGetDataPartnerMessage?.data?.data
                }
            })
        }

    }

    // The client connects to Stringee server
    const _clientDidConnect = ({ userId }) => {
        console.log('_clientDidConnect: ' + userId);
        alert('Connect THanh Cong' + userId)
    }

    // The client disconnects from Stringee server
    const _clientDidDisConnect = () => {
        console.log('_clientDidDisConnect');
    }

    // The client fails to connects to Stringee server
    const _clientDidFailWithError = () => {
        console.log('_clientDidFailWithError');
    }

    // Access token is expired. A new access token is required to connect to Stringee server
    const _clientRequestAccessToken = () => {
        console.log("_clientRequestAccessToken");
        // this.refs.client.connect('NEW_YOUR_ACCESS_TOKEN');
    }

    // IncomingCall event
    const _callIncomingCall = ({ callId, from, to, fromAlias, toAlias, callType, isVideoCall }) => {
        console.log('_callIncomingCall: ' + callId);
    }

    // IncomingCall2 event
    const _callIncomingCall2 = ({ callId, from, to, fromAlias, toAlias, callType, isVideoCall }) => {
        console.log('_callIncomingCall2: ' + callId);
        // alert('co nguoi goi')
        setShowBtnAnswer(true)
        stringeeCall2Ref?.current?.initAnswer(callId, (status, code, message) => {
            setCallId(callId)
            console.log(message);
            if (status) {
                // stringeeCall2Ref?.current?.answer(callId, (status, code, message) => {
                //     if (status) {
                //     } else {
                //     }
                // })
            } else {
                console.log('Fail');
            }
        })


    }

    // Receive custom message
    const _clientReceiveCustomMessage = ({ data }) => {
        console.log('_clientReceiveCustomMessage: ' + data);
    };

    // STRINGEE CALL 2

    // Invoked when the call signaling state changes
    const _callDidChangeSignalingState = ({ callId, code, reason, sipCode, sipReason }) => {
        console.log('_callDidChangeSignalingState:');
        console.log({ callId, code, reason, sipCode, sipReason });
    }

    // Invoked when the call media state changes
    const _callDidChangeMediaState = ({ callId, code, description }) => {
        console.log('_callDidChangeMediaState: ' + code);
    }

    // Invoked when the local stream is available    
    const _callDidReceiveLocalStream = ({ callId }) => {
        console.log('_callDidReceiveLocalStream: ' + callId);
        // alert("_callDidReceiveLocalStream:" + callId)
        setHasReceivedLocalStream(true)
    }
    // Invoked when the remote stream is available
    const _callDidReceiveRemoteStream = ({ callId }) => {
        console.log('_callDidReceiveRemoteStream: ' + callId);
        // alert("_callDidReceiveRemoteStream:" + callId)
        setHasReceivedRemoteStream(true)
        navigation.navigate(ScreenKey.VIDEO_CALL, { callId: callId, optionCall: stringeeCall2Ref?.current })
    }

    // Invoked when receives a DMTF
    const _didReceiveDtmfDigit = ({ callId, dtmf }) => {
        console.log('_didReceiveDtmfDigit');
    }

    // Invoked when receives info from other clients
    const _didReceiveCallInfo = ({ callId, data }) => {
        console.log('_didReceiveCallInfo: ' + data);
    }

    // Invoked when the call is handled on another device
    const _didHandleOnAnotherDevice = ({ callId, code, description }) => {
        console.log('_didHandleOnAnotherDevice: ' + code);
    }

    // Invoked when audio device has change
    const _didAudioDeviceChange = ({ selectedAudioDevice, availableAudioDevices }) => {
        console.log(
            '_didHandleOnAnotherDevice: selectedAudioDevice - ' +
            selectedAudioDevice +
            ' availableAudioDevices - ' +
            availableAudioDevices,
        );
    };

    const myObj = {
        // from: 'p_61174b7872004500139c4182', // callee
        // to: 'p_6144154b46366b00124ea51e', // caller
        from: 'p_6144154b46366b00124ea51e', // caller
        to: 'p_61174b7872004500139c4182', // callee
        isVideoCall: true, // Cuộc gọi là video call hoặc voice call 
        videoResolution: 'HD' // chất lượng hình ảnh 'NORMAL' hoặc 'HD'. Mặc định là 'NORMAL'.
    };

    const parameters = JSON.stringify(myObj);

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS == 'ios' && getBottomSpace() == 0 ? _heightScale(0) : 0} behavior={Platform.OS == 'ios' ? 'padding' : null} style={{
            flexGrow: 1
        }}>

            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />


            <View style={styles.container}>
                <Header />
                <ListMessages />
                <InputChat />
            </View>
        </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3E9F1"
        // // backgroundColor:'#EAEAEE'
        // backgroundColor:Color.WHITE
    },
})



export default index;