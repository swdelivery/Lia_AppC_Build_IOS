import moment from 'moment';
import React, { useState } from 'react'
import { StyleSheet, View, Text, Animated, Image, TouchableOpacity } from 'react-native';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_3, BG_GREY_OPACITY_7, BG_GREY_OPACITY_9, BLUE, BLUE_2, BLUE_FB, GREEN_2, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, NEW_BASE_COLOR, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from '../../../Constant/Scale';
import ScreenKey from '../../../Navigation/ScreenKey';
import ModalInfoTreatmentDetail from '../../Conversation/ListNoti/Components/ModalInfoTreatmentDetail'
import { styleElement } from '@Constant/StyleElement';


export default function ItemHistory(props) {



    const [showModalInfo, setShowModalInfo] = useState(false)
    const [dataModal, setDataModal] = useState(null)

    const _handleNavigateToInfo = (data) => {
        setShowModalInfo(true)
        setDataModal(data)
    }

    const _renderStatusBooking = () => {
        switch (props?.data?.status) {
            case "WAIT":
                return (
                    <Text style={[stylesFont.fontNolan500, { marginRight: _moderateScale(6), fontSize: _moderateScale(14), color: "#969696" }]}>
                        Chờ điều trị
                    </Text>
                )
            case "IN_PROGRESS":
                return (

                    <Text style={[stylesFont.fontNolan500, { marginRight: _moderateScale(6), fontSize: _moderateScale(14), color: BLUE_FB }]}>
                        Đang điều trị
                    </Text>
                )

            case "COMPLETE":
                return (

                    <Text style={[stylesFont.fontNolan500, { marginRight: _moderateScale(6), fontSize: _moderateScale(14), color: GREEN_SUCCESS }]}>
                        Hoàn thành
                    </Text>
                )

            case "CANCEL":
                return (

                    <Text style={[stylesFont.fontNolan500, { marginRight: _moderateScale(6), fontSize: _moderateScale(14), color: SECOND_COLOR }]}>
                        Đã huỷ
                    </Text>
                )
            case "NOT_COMPLETE":
                return (

                    <Text style={[stylesFont.fontNolan500, { marginRight: _moderateScale(6), fontSize: _moderateScale(14), color: SECOND_COLOR }]}>
                        Chưa hoàn thành
                    </Text>
                )
            default:
                return <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: SECOND_COLOR }]}>
                    {props?.data?.status}
                </Text>
                break;
        }
    }
    return (
        <>
            <ModalInfoTreatmentDetail
                confirm={() => {
                }}
                data={dataModal}
                hide={() => setShowModalInfo(false)}
                show={showModalInfo} />

            <TouchableOpacity onPress={() => _handleNavigateToInfo(props?.data)}
                style={[styles.itemService,
                props?.fullwidth && { width: "90%", marginRight: 0 }
                ]}>
                {/* <View style={[styles.leftService]}>
                    <Image
                    style={{width:_moderateScale(80), height:_moderateScale(80)}}
                    resizeMode="cover"
                    source={require('../../../Image/component/product.jpg')} />
                </View> */}
                <View style={[styles.rightService]}>
                    <View style={[styles.lineService]}>
                        <Image style={[sizeIcon.xs, { marginRight: _moderateScale(4) }]} source={require('../../../Icon/i_spa.png')} />

                        <Text style={[styles.nameService, styleElement.flex]}>{props?.data?.serviceName}</Text>
                    </View>
                    <View style={[styles.lineService]}>
                        <Image style={[sizeIcon.xs, { marginRight: _moderateScale(4) }]} source={require('../../../Icon/doctor.png')} />

                        <Text style={[styles.nameService]}>{props?.data?.doctor?.name}</Text>
                    </View>

                    <View style={[styles.lineService]}>
                        <Image style={[sizeIcon.xs, { marginRight: _moderateScale(4) }]} source={require('../../../Icon/clock.png')} />
                        <View style={{ flexDirection: 'row', marginBottom: _moderateScale(12) }}>
                            <Text style={{ color: GREY_FOR_TITLE }}>
                                {moment(props?.data?.created).format('LT')} -  {props?.data?.completeAt ?
                                    moment(props?.data?.completeAt).format('LT') : "-- --"} |
                            </Text>
                            <Text style={{ fontSize: _moderateScale(14), marginLeft: _moderateScale(4), fontWeight: 'bold', color: THIRD_COLOR }}>
                                {props?.data?.completeAt ?
                                    moment(props?.data?.completeAt).format('DD-MM-YYYY') : "-- --"}
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.briefService]} numberOfLines={2}>
                        {props?.data?.description}
                    </Text>
                    <View style={[styles.bottomService]}>
                        <Text style={[styles.priceService]}>
                            {_renderStatusBooking()}
                        </Text>
                        <View style={[styles.actionService]}>

                            {props?.data?.status === "COMPLETE" && <TouchableOpacity
                                // onPress={()=>navigation.navigate(ScreenKey.DIARY_OF_TREATMENT,{treatmentDetail: props?.data})}
                                onPress={() => navigation.navigate(ScreenKey.UPDATE_DAILY_DIARIES, { dataPartnerTreatment: props?.data })}
                                style={{
                                    marginRight: _moderateScale(8), backgroundColor: NEW_BASE_COLOR,
                                    borderRadius: _moderateScale(4),
                                    paddingVertical: _moderateScale(4),
                                    paddingHorizontal: _moderateScale(16)
                                }}>
                                {/* <Image
                                style={{width:_moderateScale(18), height:_moderateScale(16), marginLeft: _moderateScale(8)}}
                                resizeMode="cover"
                                source={require('../../../Image/component/diary.png')} /> */}
                                <Text style={{ color: WHITE }}>Hậu phẫu</Text>
                            </TouchableOpacity>}

                            {/* <TouchableOpacity  onPress={()=>_handleNavigateToInfo(props?.data)}>
                                <Image
                                style={{width:_moderateScale(16), height:_moderateScale(16)}}
                                resizeMode="cover"
                                source={require('../../../Image/header/search.png')} />
                            </TouchableOpacity>
                            */}

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    lineService: {
        flexDirection: 'row',
        alignContent: 'center',
    },

    itemService: {
        marginBottom: _moderateScale(12),
        width: _moderateScale(300),
        alignItems: 'center',
        marginRight: _moderateScale(12),
        paddingHorizontal: _moderateScale(12),
        borderRadius: _moderateScale(8),
        backgroundColor: WHITE,
        shadowColor: BG_GREY_OPACITY_9,
        alignItems: 'center',
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 2
    },
    leftService: {
        width: _moderateScale(80),
        height: _moderateScale(80),
        backgroundColor: BASE_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        overflow: 'hidden'
    },
    rightService: {
        paddingVertical: _moderateScale(8),
        paddingBottom: _moderateScale(12),
        paddingHorizontal: _moderateScale(0),
        flex: 1,
    },
    nameService: {
        fontSize: _moderateScale(14),
        color: NEW_BASE_COLOR,
        ...stylesFont.fontNolanBold,
        marginBottom: _moderateScale(4)
    },
    briefService: {
        color: GREY,
        fontSize: _moderateScale(12),
        marginBottom: _moderateScale(4)
    },
    priceService: {
        fontSize: _moderateScale(13),
        ...stylesFont.fontNolan,
        color: GREY_FOR_TITLE
    },
    bottomService: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    actionService: {
        flexDirection: 'row',
        paddingTop: _moderateScale(4),
    }
})
