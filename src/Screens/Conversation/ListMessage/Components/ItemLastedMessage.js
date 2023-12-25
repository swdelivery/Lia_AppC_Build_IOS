import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// REDUX 
import { useDispatch, useSelector } from "react-redux";
import FastImage from '../../../../Components/Image/FastImage';
import * as Color from '../../../../Constant/Color';
import { stylesFont } from '../../../../Constant/Font';
import { _moderateScale, _widthScale } from '../../../../Constant/Scale';
import { styleElement } from '../../../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../../Constant/Url';
import { _substringMaxValue } from '../../../../Constant/Utils';
import Avatar from '../../../../Components/User/Avatar';
import _isEmpty from 'lodash/isEmpty'

const ItemMessage = (props => {

    const membersRedux = useSelector(state => state.membersReducer)
    const infoUserRedux = useSelector(state => state.infoUserReducer)
    const messageRedux = useSelector(state => state.messageReducer)

    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    useEffect(() => {

    }, [messageRedux.listNewMessages])

    const _renderAvatarDoctor = () => {
        let findMainDoctor = props?.data?.assignedUsers?.find(item => item?.isMain);
        if (findMainDoctor) {
            return (
                <Image
                    resizeMode="cover"
                    source={{ uri: `${URL_ORIGINAL}${findMainDoctor?.profile?.fileAvatar?.link}` }}
                    style={{
                        width: _moderateScale(56),
                        height: _moderateScale(56),
                        borderRadius: _moderateScale(28),
                        backgroundColor: Color.BG_GREY_OPACITY_5
                    }} />
            )
        } else {
            return (
                <Image
                    resizeMode="cover"
                    source={require('../../../../NewIcon/bacsi.png')}
                    style={{
                        width: _moderateScale(56),
                        height: _moderateScale(56),
                        borderRadius: _moderateScale(28),
                        backgroundColor: Color.BG_GREY_OPACITY_5
                    }} />
            )
        }
    }

    const _renderNameDoctor = () => {
        let findMainDoctor = props?.data?.assignedUsers?.find(item => item?.isMain);
        if (findMainDoctor) {
            return (
                <Text
                    style={[stylesFont.fontNolan500, { flex: 1, marginRight: _moderateScale(16), fontSize: _moderateScale(15), color: Color.GREY }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(15), color: Color.BLACK }]]}
                    numberOfLines={1}>
                    {findMainDoctor?.name}
                </Text>
            )
        } else {
            return (
                <Text
                    style={[stylesFont.fontNolan500, { flex: 1, marginRight: _moderateScale(16), fontSize: _moderateScale(15), color: Color.GREY }, !props.isSeen && [stylesFont.fontNolanBold, { fontSize: _moderateScale(15), color: Color.BLACK }]]}
                    numberOfLines={1}>
                    Hỗ trợ sau điều trị
                </Text>
            )
        }
    }


    return (
      <TouchableOpacity
        onPress={() => {
          props.navigateToChatting();
        }}
        style={[
          styleElement.rowAliCenter,
          { marginTop: _moderateScale(8 * 2.5) },
        ]}
      >
        <View style={{ marginHorizontal: _moderateScale(24) }}>
          {!isEmpty(props?.data) && props?.data?.type == "treatment" ? (
            // <Avatar
            //     url={
            //         `https://image.shutterstock.com/image-vector/doctor-vector-illustration-260nw-512904655.jpg`
            //     }
            //     isOnline={true}
            //     name={''}
            //     notName />
            _renderAvatarDoctor()
          ) : (
            <></>
          )}
          {!isEmpty(props?.data) && props?.data?.type == "consultation" ? (
            <Image
              resizeMode="cover"
              source={require("src/NewImage/logoLiA.png")}
              style={{
                width: _moderateScale(56),
                height: _moderateScale(56),
                borderRadius: _moderateScale(28),
                backgroundColor: Color.BG_GREY_OPACITY_5,
              }}
            />
          ) : (
            <></>
          )}
          {!isEmpty(props?.data) && props?.data?.type == "videoCallRequest" ? (
            <Image
              resizeMode="cover"
              source={require("../../../../NewIcon/noteCall.png")}
              style={{
                width: _moderateScale(56),
                height: _moderateScale(56),
                borderRadius: _moderateScale(28),
                backgroundColor: Color.BG_GREY_OPACITY_5,
              }}
            />
          ) : (
            <></>
          )}
          {/* {
                    !isEmpty(props?.data) && props?.data?.groupChat?.type == 'multiple' ?
                        <View style={{ justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', width: _widthScale(60) }}>
                            {
                                props?.data?.receiverChatArr?.map((item, index) => {

                                    if (index > 3) return
                                    if (index > 2) {
                                        return (
                                            <View key={index} style={{
                                                width: _moderateScale(24),
                                                height: _moderateScale(24),
                                                borderRadius: _moderateScale(12),
                                                overflow: 'hidden',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <LinearGradient
                                                    start={{ x: 0, y: 1 }}
                                                    end={{ x: 1, y: 1 }}
                                                    colors={gradient.color}
                                                    style={gradient.container}>
                                                    <Text style={[stylesFont.fontDinTextPro, { fontSize: _moderateScale(12), color: Color.WHITE }]}>
                                                        {`+${props?.data?.receiverChatArr.length - 3}`}
                                                    </Text>
                                                </LinearGradient>
                                            </View>
                                        )
                                    }
                                    return (
                                        <FastImage key={index} style={[{
                                            width: _moderateScale(24),
                                            height: _moderateScale(24),
                                            borderRadius: _moderateScale(12)
                                        }]}
                                            uri={item?.profile?.fileAvatar?.link ? `${URL_ORIGINAL}${item?.profile?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                        />
                                    )
                                })
                            }
                        </View>
                        :
                        <>
                        </>
                } */}
        </View>
        <View style={{ flex: 1, paddingRight: _moderateScale(16) }}>
          <View style={[styleElement.rowAliCenter]}>
            {props?.data?.type == "consultation" ? (
              <Text
                style={[
                  stylesFont.fontNolan500,
                  {
                    flex: 1,
                    marginRight: _moderateScale(16),
                    fontSize: _moderateScale(15),
                    color: Color.GREY,
                  },
                  !props.isSeen && [
                    stylesFont.fontNolanBold,
                    { fontSize: _moderateScale(15), color: Color.BLACK },
                  ],
                ]}
                numberOfLines={1}
              >
                {props?.data?.name?.length > 0 ? props?.data?.name : "Tư vấn"}
              </Text>
            ) : (
              <></>
            )}
            {props?.data?.type == "treatment" ? _renderNameDoctor() : <></>}
            {props?.data?.type == "videoCallRequest" ? (
              <Text
                style={[
                  stylesFont.fontNolan500,
                  {
                    flex: 1,
                    marginRight: _moderateScale(16),
                    fontSize: _moderateScale(15),
                    color: Color.GREY,
                  },
                  !props.isSeen && [
                    stylesFont.fontNolanBold,
                    { fontSize: _moderateScale(15), color: Color.BLACK },
                  ],
                ]}
                numberOfLines={1}
              >
                Yêu cầu Video Call
              </Text>
            ) : (
              <></>
            )}

            <Text
              style={[
                stylesFont.fontNolan,
                { color: Color.GREY, fontSize: _moderateScale(11) },
                !props.isSeen && [
                  stylesFont.fontNolanBold,
                  { color: Color.BLACK },
                ],
              ]}
            >
              {moment(props?.data?.latestMessage?.created)
                .startOf("minute")
                .fromNow()}
            </Text>
          </View>
          <View style={{ height: _moderateScale(4) }} />
          <View>
            {props?.data?.isActive ? (
              <>
                {!_isEmpty(props?.data?.latestMessage) ? (
                  <>
                    {props?.data?.latestMessage?.type === "text" ||
                    props?.data?.latestMessage?.type === "template" ? (
                      <Text
                        style={[
                          stylesFont.fontNolan500,
                          {
                            fontSize: _moderateScale(12),
                            color: Color.GREY,
                          },
                          !props.isSeen && [
                            stylesFont.fontNolanBold,
                            {
                              fontSize: _moderateScale(12),
                              color: Color.BLACK,
                            },
                          ],
                        ]}
                        numberOfLines={1}
                      >
                        {/* {_substringMaxValue(props?.data?.content, '', 200, '')} */}
                        {props?.data?.latestMessage?.content
                          ? props?.data?.latestMessage?.content
                          : `Bạn có tin nhắn mới`}
                      </Text>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <Text
                    style={[
                      stylesFont.fontNolan500,
                      {
                        fontSize: _moderateScale(12),
                        color: Color.GREY,
                      },
                      !props.isSeen && [
                        stylesFont.fontNolanBold,
                        { fontSize: _moderateScale(12), color: Color.BLACK },
                      ],
                    ]}
                    numberOfLines={1}
                  >
                    Hãy bắt đầu cuộc trò chuyện
                  </Text>
                )}

                {props?.data?.latestMessage?.type === "image" ? (
                  <Text
                    style={[
                      stylesFont.fontNolan500,
                      {
                        fontSize: _moderateScale(12),
                        color: Color.GREY,
                      },
                      !props.isSeen && [
                        stylesFont.fontNolanBold,
                        { fontSize: _moderateScale(12), color: Color.BLACK },
                      ],
                    ]}
                    numberOfLines={1}
                  >
                    [Hình ảnh]
                  </Text>
                ) : (
                  <></>
                )}
                {props?.data?.latestMessage?.type === "video" ? (
                  <Text
                    style={[
                      stylesFont.fontNolan500,
                      {
                        fontSize: _moderateScale(12),
                        color: Color.GREY,
                      },
                      !props.isSeen && [
                        stylesFont.fontNolanBold,
                        { fontSize: _moderateScale(12), color: Color.BLACK },
                      ],
                    ]}
                    numberOfLines={1}
                  >
                    [Video]
                  </Text>
                ) : (
                  <></>
                )}

                {props?.data?.latestMessage?.type === "document" ? (
                  <Text
                    style={[
                      stylesFont.fontNolan500,
                      {
                        fontSize: _moderateScale(12),
                        color: Color.GREY,
                      },
                      !props.isSeen && [
                        stylesFont.fontNolanBold,
                        { fontSize: _moderateScale(12), color: Color.BLACK },
                      ],
                    ]}
                    numberOfLines={1}
                  >
                    [Tệp tin]
                  </Text>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <Text
                  style={[
                    stylesFont.fontNolan500,
                    {
                      fontSize: _moderateScale(12),
                      color: Color.GREY,
                    },
                    !props.isSeen && [
                      stylesFont.fontNolanBold,
                      { fontSize: _moderateScale(12), color: Color.BLACK },
                    ],
                  ]}
                  numberOfLines={1}
                >
                  [Tin nhắn thu hồi]
                </Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
})

const styles = StyleSheet.create({

})

const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        Color.BASE_COLOR,
        'rgba(104, 47, 144,.4)'
    ]
}


export default memo(ItemMessage);
