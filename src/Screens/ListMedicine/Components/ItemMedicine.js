import moment from 'moment';
import React, { memo, useState , useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, BASE_COLOR, BLUE_FB, THIRD_COLOR, BLACK_OPACITY, SECOND_COLOR } from '../../../Constant/Color';
import { _moderateScale } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import ModalInfoMedicine from './ModalInfoMedicine'
import ItemSection from './ItemSection'

const ItemBooking = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [showModalInfoBooking, setShowModalInfoBooking] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [selectedDate, setSelectedDate] = useState(-1)
    const [dataInfo, setDataInfo] = useState(false)

    const _handleNavigateToInfoModal = (data, index) => {
        setShowModalInfoBooking(true)
        setSelectedDate(index)
        setDataInfo(data)
        // navigation.navigate(INFO_BOOKING, { data: props?.data })
    }

    useEffect(() => {
        let current = moment().format('YYYY-MM-DD')
        let index = props?.data?.dailyDetails.findIndex(item=> moment(item.date).format('YYYY-MM-DD') === current)
        if(index>-1)
        {
            setSelectedDate(index)
        }
    }, [])


    return (
        <View
            style={styles.container}>

            <ModalInfoMedicine
                confirm={() => {
                }}
                data={dataInfo}
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

            </View>
            <Text style={{fontStyle:'italic', color:GREY_FOR_TITLE, marginTop: _moderateScale(8)}}>(*) Chọn vào ngày để xem chi tiết</Text>
            <View style={{flex:1, marginVertical: _moderateScale(8)}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {props?.data?.dailyDetails?.map((res, index)=>{
                        return <TouchableOpacity 
                        onPress={()=>_handleNavigateToInfoModal(res, index)}
                        style={[styles.itemDaily, selectedDate === index&&styles.activeDaily]}>
                                <Text 
                                 style={[selectedDate === index&&styles.activeTextDaily]}
                                >Ngày {res?.index}</Text>
                            </TouchableOpacity>
                    })}
                </ScrollView>
            </View>

            {/* <View style={[ { marginTop: _moderateScale(8) }]} />
            {
                props?.data?.details?.length > 0 ?
                    <ItemSection data={props?.data?.details[0]} />
                    : <></>
            } */}
            {/* <Collapsible
                collapsed={hidden}>
                {

                    props?.data?.details?.map((res, i) => {
                        return i > 0 &&
                            <>
                                <ItemSection data={res} key={i} />
                            </>

                    })
                }
            </Collapsible> */}

            {/* {
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
            } */}

        </View>


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
    },
    itemDaily:{
        backgroundColor: '#fafafa',
        paddingHorizontal: _moderateScale(12),
        paddingVertical: _moderateScale(4),
        marginRight: _moderateScale(8),
        borderRadius: _moderateScale(4)
    },
    activeDaily:{
        backgroundColor: SECOND_COLOR,
    },
    activeTextDaily:{
        color: WHITE,
    }
})

export default ItemBooking;