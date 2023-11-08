import { isEmpty } from 'lodash';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, FlatList, Text } from 'react-native';
import ImageView from "react-native-image-viewing";
import { useSelector } from 'react-redux';
import SocketInstance from '../../../../SocketInstance';
import ModalShowListUserHasSeenMessage from '../../../Components/Message/ModalShowListUserHasSeenMessage';
import ModalRemoveMessage from '../../../Components/Message/ModalRemoveMessage'
import { URL_ORIGINAL } from '../../../Constant/Url';
import * as ActionType from '../../../Redux/Constants/ActionType';
import Store from "../../../Redux/store";
// CALL API
import { _getMoreMessageByLastedId, _getNewestMessageByFirstMessageId } from '../../../Services/api';
import { handleApi } from '../../../Services/utils';
import { CSS_USER_SEEN_MESSAGE, CSS_PARTNER_SEEN_MESSAGE } from '../../../Sockets/type';
import EachMessage from './EachMessage';

import { getAfterDataPartnerMessage, getDataPartnerMessage } from '../../../Redux/Action/MessageActionV2'
import ItemServiceReview from './ItemServiceReview';
import ItemTemplateService from './ItemTemplateService';
import ItemTemplateNews from './ItemTemplateNews';
import ItemNavigateBooking from './ItemNavigateBooking';
import ItemNavigateCTV from './ItemNavigateCTV';
import ItemNavigateSpinWheel from './ItemNavigateSpinWheel';






const ListMessages = memo((props) => {

    const currListMessageRedux = useSelector(state => state?.messageReducer?.currRoomChatting)
    const infoCurrRoomChattingRedux = useSelector(state => state?.messageReducer?.currRoomChatting?.infoCurrRoomChatting)




    const [isShowModalListUserHasSeenMessage, setIsModalListUserHasSeenMessage] = useState(false)
    const [isShowModalRemoveMessage, setIsShowModalRemoveMessage] = useState(false)
    const [currFocusMessage, setCurrFocusMessage] = useState({})
    const [currMessageForRemove, setCurrMessageForRemove] = useState({})
    const [flagLoadmoreMessage, setFlagLoadmoreMessage] = useState(false)
    const [flagReachedEnd, setFlagReachedEnd] = useState(false)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [showListImagesSee, setShowListImagesSee] = useState(false)
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [isLoadingMoreMessage, setIsLoadingMoreMessage] = useState(false)

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState("");

    const VideoRef = useRef()


    useEffect(() => {
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
    }, []);


    useEffect(() => {
        (async () => {
            if (appStateVisible == "active") {
                let resultGetBeforeDataPartnerMessage = await getDataPartnerMessage({
                    condition: {
                        conversationId: infoCurrRoomChattingRedux?._id,
                        before: currListMessageRedux?.messages[0]?._id
                    },
                    limit: 20,
                    page: 1
                })  

                Store.dispatch({
                    type: ActionType.GET_NEWEST_MESSAGE,
                    payload: {
                        data: resultGetBeforeDataPartnerMessage?.data?.data 
                    }
                })
            }
        })()
    }, [appStateVisible])




    const _setCurrFocusMessage = useCallback((item) => {
        setCurrFocusMessage(item)
    }, [])
    const _setCurrMessageForRemove = useCallback((item) => {
        setCurrMessageForRemove(item)
    }, [])
    const _setIsModalListUserHasSeenMessage = useCallback((flag) => {
        setIsModalListUserHasSeenMessage(flag)
    }, [])
    const _setIsShowModalRemoveMessage = useCallback((flag) => {
        setIsShowModalRemoveMessage(flag)
    }, [])



    useEffect(() => {

        if (isEmpty(currListMessageRedux?.messages)) return
        if (currListMessageRedux?.messages[0]?.isPartnerSeen == true) return

        let data = {
            conversationId: infoCurrRoomChattingRedux?._id,
            messageIds: [currListMessageRedux?.messages[0]?._id]
        }
        SocketInstance?.socketConn?.emit(CSS_PARTNER_SEEN_MESSAGE, data)


    }, [currListMessageRedux?.messages])


    const _onLoadMoreMessages = async () => {
        setIsLoadingMoreMessage(true)
        if (flagReachedEnd) return setFlagLoadmoreMessage(false)

        setFlagLoadmoreMessage(true)

        let resultGetAfterDataPartnerMessage = await getAfterDataPartnerMessage({
            condition: {
                conversationId: infoCurrRoomChattingRedux?._id,
                after: currListMessageRedux?.messages[currListMessageRedux?.messages?.length - 1]?._id
            },
            // sort: {
            //     created: -1
            // },
            limit: 20,
            page: 1
        })
        console.log({ resultGetAfterDataPartnerMessage });


        if (resultGetAfterDataPartnerMessage.isAxiosError) {
            setFlagLoadmoreMessage(false)
            return
        }

        if (isEmpty(resultGetAfterDataPartnerMessage?.data?.data)) {
            setFlagReachedEnd(true)
            return setFlagLoadmoreMessage(false)
        }

        Store.dispatch({
            type: ActionType.GET_MORE_MESSAGE,
            payload: {
                data: resultGetAfterDataPartnerMessage?.data?.data
            }
        })

        setIsLoadingMoreMessage(false)
    }

    const _setListImagesSeeCurr = useCallback((item, index) => {
        setListImagesSeeCurr(item)
        setShowListImagesSee(true)
        setIndexCurrImageView(index)
    }, [])

    const _renderMessage = ({ item, index }) => {
        if(item?.type == 'template'){
            // return (
            //     <ItemServiceReview item={item} index={index}/>
            // ) 
            switch (item?.template?.type) {
                case "SERVICE_REVIEW":
                case "REVIEW_DETAIL":
                case "TREATMENT_DETAIL":
                    return (
                        <ItemServiceReview item={item} index={index} />
                    )

                case "SERVICE":
                    return (
                        <ItemTemplateService item={item} index={index} />
                    )
                case "NEWS":
                    return (
                        <ItemTemplateNews item={item} index={index} />
                    )
                case "BOOKING":
                    return (
                        <ItemNavigateBooking item={item} index={index} />
                    )
                case "COLLABORATOR":
                    return (
                        <ItemNavigateCTV item={item} index={index} />
                    )
                case "SPIN_WHEEL":
                    return (
                        <ItemNavigateSpinWheel item={item} index={index} />
                    )

                default:
                    break;
            }
        }
        return (
            <EachMessage
                setListImagesSeeCurr={_setListImagesSeeCurr}
                setCurrFocusMessage={_setCurrFocusMessage}
                setCurrMessageForRemove={_setCurrMessageForRemove}
                setIsModalListUserHasSeenMessage={_setIsModalListUserHasSeenMessage}
                setIsShowModalRemoveMessage={_setIsShowModalRemoveMessage}
                index={index}
                item={item}
            // isOnline={
            //     !isEmpty(listUserOnlineRedux) && listUserOnlineRedux.find(itemFind => itemFind == item.senderId)
            // }
            />
        )
    }

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);

    const _renderListFooter = () => {
        if (flagLoadmoreMessage) {
            return (
                <ActivityIndicator
                    style={{ color: '#000' }}
                />
            )
        } else {
            return <></>
        }
    }

    return (
        <>

            <ModalShowListUserHasSeenMessage
                data={currFocusMessage}
                closeModalListUserHasSeenMessage={() => setIsModalListUserHasSeenMessage(false)}
                isShowModalListUserHasSeenMessage={isShowModalListUserHasSeenMessage} />

            <ModalRemoveMessage
                data={currMessageForRemove}
                closeModalRemoveMessage={() => setIsShowModalRemoveMessage(false)}
                isShowModalRemoveMessage={isShowModalRemoveMessage} />



            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item.link}`,
                    }
                })}

                onRequestClose={() => {
                    setShowListImagesSee(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showListImagesSee}
            />

            <FlatList
                onMomentumScrollBegin={() => {
                    setOnEndReachedCalledDuringMomentum(false)
                }}
                inverted
                onEndReachedThreshold={0.01}
                contentContainerStyle={{ flexGrow: 1 }}
                data={!isEmpty(currListMessageRedux?.messages) ? currListMessageRedux?.messages : []}
                renderItem={_renderMessage}
                keyExtractor={_awesomeChildListKeyExtractor}
                onEndReached={() => {
                    if (!isLoadingMoreMessage) {
                        if (!onEndReachedCalledDuringMomentum) {
                            _onLoadMoreMessages()
                            setOnEndReachedCalledDuringMomentum(true)
                        }
                    }


                }}
                ListFooterComponent={_renderListFooter}
            />
        </>
    );
});



export default ListMessages;