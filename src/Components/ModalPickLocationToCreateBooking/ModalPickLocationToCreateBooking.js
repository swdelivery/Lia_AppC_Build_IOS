import React, { memo, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _widthScale, _moderateScale } from '../../Constant/Scale';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from '../../Redux/Store';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import ScreenKey from '../../Navigation/ScreenKey'
import { navigation } from '../../../rootNavigation';
import { getAllBranch } from '../../Redux/Action/BranchAction';
import { URL_ORIGINAL } from '../../Constant/Url';
import CountStar from '../../Components/CountStar/index';

const ModalPickLocationToCreateBooking = memo((props) => {
    const dispatch = useDispatch()

    const listBranchRedux = useSelector(state => state?.branchReducer?.listBranch)

    useEffect(() => {
        dispatch(getAllBranch())
    }, [])

    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center'
        }}
            animationIn='zoomIn'
            animationOut='zoomOut'
            // animationInTiming={500}
            // animationOutTiming={500}
            isVisible={props?.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
            }}>

            <View style={styles.modalFilter}>

                {/* <View style={{ alignItems: 'flex-end', paddingRight: _moderateScale(8 * 2) }}>
                    <TouchableOpacity
                        onPress={() => {
                            props?.hide()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>
                </View> */}



                <View style={{ paddingHorizontal: _moderateScale(8 * 2), alignItems:'center' , flexDirection:'row', justifyContent:'center', paddingBottom:_moderateScale(8*1.5), borderBottomWidth:0.5,borderColor:Color.BG_GREY_OPACITY_9}}>


                    <Text style={[stylesFont.fontNolanBold, {flex:1, fontSize: _widthScale(16), marginBottom: _heightScale(0), color: Color.BLACK_OPACITY_8 }]}>
                        Chọn chi nhánh đặt hẹn
                    </Text>

                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            props?.hide()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1 , backgroundColor:Color.BG_BEAUTY}}>
                    <ScrollView scrollIndicatorInsets={{right:1}}>
                        {
                            listBranchRedux?.length > 0 && listBranchRedux?.map((item, index) => {
                                return (

                                    <View key={index} style={{
                                        paddingHorizontal: _moderateScale(8 * 2),
                                        marginTop: _moderateScale(8 * 2)
                                    }}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            // onPress={() => navigation.navigate(ScreenKey.DETAIL_BRAND, { idBranch: item?._id })}
                                            style={[{
                                                width: '100%',
                                                // height: 200,
                                                backgroundColor: Color.WHITE,
                                                borderRadius: _moderateScale(8 * 1),
                                                paddingBottom: _moderateScale(8 * 2)
                                            }, shadow]}>
                                            <View style={{
                                                margin: _moderateScale(8 * 2),
                                                height: _moderateScale(8 * 14),
                                                backgroundColor: Color.BG_GREY_OPACITY_2,
                                                borderRadius: _moderateScale(8),
                                                overflow: 'hidden'
                                            }}>
                                                {
                                                    item?.representationFileArr?.length > 0 ?
                                                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` }} />
                                                        : <></>
                                                }
                                            </View>

                                            <View style={{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row' }}>
                                                {
                                                    item?.representationFileArr?.length > 0 ?
                                                        <Image style={{ width: _moderateScale(8 * 4), height: _moderateScale(8 * 4), borderRadius: _moderateScale(8 * 4 / 2) }} source={{ uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}` }} />
                                                        : <View style={{ width: _moderateScale(8 * 4), height: _moderateScale(8 * 4), borderRadius: _moderateScale(8 * 4 / 2), backgroundColor: Color.BG_GREY_OPACITY_2 }} />
                                                }

                                                <View style={{ marginLeft: _moderateScale(8 * 1), flex: 1 }}>
                                                    <Text numberOfLines={1} style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: Color.BLACK_OPACITY_7 }}>
                                                        {item?.name}
                                                    </Text>
                                                    <View style={[styleElement.rowAliCenter, { marginVertical: _moderateScale(4) }]}>
                                                        <Image style={sizeIcon.xxxs} source={require('../../NewIcon/location.png')} />
                                                        <Text style={{ marginLeft: _moderateScale(8), flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY }} numberOfLines={1}>
                                                            {item?.address}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row', marginTop: _moderateScale(8), justifyContent: 'space-between' }}>
                                                <View style={[styleElement.rowAliCenter]}>
                                                    <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} small />

                                                    <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8) }]}>
                                                        <Image style={sizeIcon.xxxs} source={require('../../NewIcon/people.png')} />
                                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY, marginLeft: _moderateScale(4) }}>
                                                            {item?.countPartner}
                                                </Text>
                                                    </View>
                                                </View>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        props?.onConfirm(item)
                                                    }}

                                                    hitSlop={styleElement.hitslopSm}
                                                    style={[styles.btnBoooking, shadow]}
                                                // onPress={() => navigation.navigate(ScreenKey.BOOKING_FOR_BRANCH, { branchCode: item?.code, refCode: "" })}
                                                >
                                                    <Text style={{ color: Color.WHITE, ...stylesFont.fontNolanBold, fontSize: _moderateScale(13) }}>Tiếp tục</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                        <View style={{height:25}}/>
                    </ScrollView>



                </View>
            </View>
        </Modal>
    );

});


const styles = StyleSheet.create({
    modalFilter: {
        width: "85%",
        backgroundColor: Color.WHITE,
        borderRadius: _widthScale(8 * 2),
        backgroundColor: Color.WHITE,
        paddingVertical: _heightScale(8 * 2),
        height: "85%"
    },
    viewContent: {
        paddingHorizontal: _widthScale(8 * 3),
    },
    content: {
        fontSize: _widthScale(14),
        // lineHeight: _heightScale(16),
        color: Color.GREY
    },
    cancelBtn: {
        alignSelf: 'flex-end',
        padding: _widthScale(8),
        marginTop: _heightScale(8),
    },
    cancelBtn__text: {
        fontSize: _widthScale(16),
        color: Color.BASE_COLOR
    },
    btnBoooking: {
        backgroundColor: Color.BASE_COLOR,
        paddingHorizontal: _moderateScale(8 * 1),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(4)
    },
})


const shadow = {
    shadowColor: Color.BASE_COLOR,
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,


    elevation: 1
}


export default ModalPickLocationToCreateBooking;