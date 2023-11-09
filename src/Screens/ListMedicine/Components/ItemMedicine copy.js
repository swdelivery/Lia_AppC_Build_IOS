import moment from 'moment';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, BASE_COLOR, BLUE_FB, THIRD_COLOR } from '../../../Constant/Color';
import { _moderateScale } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import ModalInfoBooking from '../../Conversation/ListNoti/Components/ModalInfoBooking'
import ItemSection from './ItemSection'

const ItemBooking = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [showModalInfoBooking, setShowModalInfoBooking] = useState(false)
    const [hidden, setHidden] = useState(true)


    const _handleNavigateToInfoBooking = () => {
        setShowModalInfoBooking(true)
        // navigation.navigate(INFO_BOOKING, { data: props?.data })
    }

    return (

        <TouchableOpacity
            // onPress={_handleNavigateToInfoBooking}
            style={styles.container}>

            <ModalInfoBooking
                confirm={() => {
                }}
                data={props?.data}
                hide={() => setShowModalInfoBooking(false)}
                show={showModalInfoBooking} />

            <View style={[styleElement.rowAliCenter]}>

                <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                    <View style={{ marginLeft: _moderateScale(8) }}>
                        <Text numberOfLines={1} style={[stylesFont.namePartnerNolan500, { fontSize: _moderateScale(16), color: BASE_COLOR }]}>
                            {props?.data?.name}
                        </Text>
                        <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: THIRD_COLOR, fontWeight: 'bold' }]}>
                            {
                                `${moment(props?.data?.time?.from).format('DD/MM')} - ${moment(props?.data?.time?.to).format('DD/MM/YYYY')} `
                            }
                        </Text>
                        <Text style={[stylesFont.phonePartnerNolan_14, { fontStyle: 'italic', color: GREY }]}>
                            {`${props?.data?.description}`}
                        </Text>
                    </View>

                </View>
{/* 
                <View style={[{ alignItems: 'flex-end' }]}>
                    <View style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8) }]}>
                   
                        <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: BLACK }]}>
                            {
                                `${moment(props?.data?.time?.from).format('DD/MM')} - ${moment(props?.data?.time?.to).format('DD/MM/YYYY')} `
                            }
                        </Text>
                    </View>

                </View> */}

            </View>
            <View style={[ { marginTop: _moderateScale(8) }]} />
            {
                props?.data?.details?.length > 0 ?
                    <ItemSection data={props?.data?.details[0]} />
                    : <></>
            }
            <Collapsible
                collapsed={hidden}>
                {

                    props?.data?.details?.map((res, i) => {
                        return i > 0 &&
                            <>
                                <ItemSection data={res} key={i} />
                            </>

                    })
                }
            </Collapsible>

            {
                props?.data?.details?.length > 1 && <>
                    <View style={[styleElement.lineHorizontal, { marginTop: _moderateScale(8) }]} />

                    <TouchableOpacity
                        style={{ paddingVertical: _moderateScale(12), flexDirection: 'row' }}
                        onPress={() => setHidden(!hidden)}>
                        {hidden ?
                            <Image source={require('../../../Icon/expandDown_grey.png')}
                                style={{ width: _moderateScale(14), height: _moderateScale(14), marginRight: _moderateScale(8) }} /> :
                            <Image source={require('../../../Icon/expandUp_grey.png')}
                                style={{ width: _moderateScale(14), height: _moderateScale(14), marginRight: _moderateScale(8) }} />
                        }

                        <Text style={{ alignSelf: 'flex-start', color: BLUE_FB }}>{hidden ? 'Xem thêm' : 'Thu gọn'}</Text>
                    </TouchableOpacity>
                </>
            }

        </TouchableOpacity>


    );
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8)
    },
    itemTime: {
        marginVertical: _moderateScale(6),
    },
    topTime: {
        flexDirection: 'row'
    },
    leftTopTime: {
        flex: 1
    },
    detailTime: {
        marginTop: _moderateScale(4)
    },
    lineMedicine: {
        flexDirection: 'row',
        marginBottom: _moderateScale(2),
        justifyContent: 'space-between',
        // borderBottomWidth: _moderateScale(0.3),
        paddingVertical: _moderateScale(4),
        borderColor: '#f1f2f3'
    }
})

export default ItemBooking;