import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import Header from '../../../Components/Header/Header';
import { BG_BEAUTY, BLUE_FB, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE, BASE_COLOR } from '../../../Constant/Color';
import { useDispatch, useSelector } from 'react-redux'
import { getTreatmentDetail } from '../../../Redux/Action/InfoAction';
import { _moderateScale, _heightScale } from '../../../Constant/Scale';
import { sizeIcon } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';
import moment from 'moment';
import { navigation } from '../../../../rootNavigation';
import { createPartnerDiary } from '../../../Redux/Action/PartnerDiary';
import { isEmpty } from 'lodash-es';
import { styleElement } from '../../../Constant/StyleElement';

const PickTreatmentToDiary = props => {
    const dispatch = useDispatch()

    const listTreatmentDetail = useSelector(state => state?.infoReducer?.treatmentDetail)

    useEffect(() => {
        dispatch(getTreatmentDetail())
    }, [])

    const _handleCreateDiary = (data) => {
        if (!isEmpty(data)) {
            _createPartnerDiary(data)
        }
    }

    const _createPartnerDiary = async (data) => {
        let result = await dispatch(
            createPartnerDiary({
                type: 'TreatmentDetail',
                entityId: data?._id,
                serviceCode: data?.serviceCode,
                serviceName: data?.serviceName,
            })
        )

        if (result?.isAxiosError) return
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={BASE_COLOR} />
            {/* <Header title={`Lịch sử điều trị`} keyGoBack={props?.route?.params?.keyGoBack}
                styleTit={{ color: WHITE }}
                backStyle={`white`}
                styleCus={{ backgroundColor: SECOND_COLOR }} /> */}


            <View style={{
                width: "100%",
                height: _heightScale(48),
                backgroundColor: BASE_COLOR,
                alignItems: "center",
                zIndex: 1,
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: _moderateScale(8 * 2)
            }}>
                <View style={{ width: '10%' }}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        style={{}}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../../Icon/back_left_white.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems:'center'}}>
                    <Text numberOfLines={1} style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), color: WHITE }}>
                        Lịch sử điều trị
                    </Text>
                </View>

                <View style={{ width: '10%', alignItems: 'flex-end' }}>

                </View>
            </View>

            <View style={[styles.main]}>
                <Text style={{
                    marginVertical: _moderateScale(4),
                    color: GREY,
                    fontStyle: 'italic'
                }}>
                    Vui lòng chọn điều trị muốn tạo nhật ký</Text>

                <ScrollView>
                    {
                        listTreatmentDetail?.map((item, ind) => {
                            return item?.status === 'COMPLETE' && <View
                                style={[styles.itemMain]}
                                key={ind}>
                                <View style={[styles.lineService]}>
                                    <Image style={[sizeIcon.xs, { marginRight: _moderateScale(4) }]} source={require('../../../Icon/i_spa.png')} />

                                    <Text style={[styles.nameService]}>{item?.serviceName}</Text>
                                </View>
                                <View style={[styles.lineService]}>
                                    <Image style={[sizeIcon.xs, { marginRight: _moderateScale(4) }]} source={require('../../../Icon/doctor.png')} />

                                    <Text style={[styles.nameService]}>{item?.doctor?.name}</Text>
                                </View>
                                <View style={[styles.lineService]}>
                                    <Image style={[sizeIcon.xs, { marginRight: _moderateScale(4) }]} source={require('../../../Icon/clock.png')} />
                                    <View style={{ flexDirection: 'row', marginBottom: _moderateScale(12) }}>
                                        <Text style={{ color: GREY_FOR_TITLE }}>
                                            {moment(item?.created).format('hh:ss')} -  {moment(item?.completeAt).format('hh:ss')} |
                                </Text>
                                        <Text style={{ fontSize: _moderateScale(14), fontWeight: 'bold', color: BLUE_FB }}>
                                            {moment(item?.completeAt).format('DD-MM-YYYY')}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={[styles.briefService]} numberOfLines={2}>
                                    {item?.description}
                                </Text>
                                {item?.hasPartnerDiary ?
                                    <View
                                        style={[styles.btnAdd, { backgroundColor: WHITE }]}>
                                        <Text style={{ color: BLUE_FB, fontSize: _moderateScale(14) }}>Đã tạo nhật ký</Text>
                                    </View>
                                    : <TouchableOpacity
                                        onPress={() => _handleCreateDiary(item)}
                                        style={[styles.btnAdd]}>
                                        <Text style={{ color: WHITE, fontSize: _moderateScale(14) }}>Chọn</Text>
                                    </TouchableOpacity>}
                            </View>
                        })
                    }

                    <View style={{height:100}}/>
                </ScrollView>

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    },
    btnAdd: {
        position: 'absolute',
        right: _moderateScale(12),
        top: _moderateScale(12),
        backgroundColor: SECOND_COLOR,
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(16),
        borderRadius: _moderateScale(4),
        alignSelf: 'flex-end'
    },
    main: {
        padding: _moderateScale(12)
    },
    itemMain: {
        backgroundColor: WHITE,
        marginVertical: _moderateScale(6),
        padding: _moderateScale(12),
        borderRadius: _moderateScale(4)
    },
    nameService: {
        fontSize: _moderateScale(14),
        color: SECOND_COLOR,
        ...stylesFont.fontNolanBold,
        marginBottom: _moderateScale(4)
    },
    briefService: {
        color: GREY,
        fontSize: _moderateScale(12),
        marginBottom: _moderateScale(4)
    },
    lineService: {
        flexDirection: 'row',
        alignContent: 'center',
    },
})

export default PickTreatmentToDiary;