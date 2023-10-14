import React, { memo, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_5, BG_GREY_OPACITY_9, BLUE, GREY, SECOND_COLOR, WHITE } from '../../Constant/Color';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale } from '../../Constant/Scale';
import ScreenKey from '../../Navigation/ScreenKey';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import Button from '../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import _isEmpty from 'lodash/isEmpty'
import { getListBranchLocation, createNewBooking, uploadModule } from '../../Redux/Action/BookingAction'
import CountStar from '../../Components/CountStar/index'
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import CalendarPickSingle from '../../Components/CalendarPickSingle/CalendarPickSingle'
import moment from 'moment'
import { alertCustomNotAction } from '../../Constant/Utils';
import { createVideoRequest, getAssets, getAssetsGroup } from '../../Redux/Action/OrtherAction';
import ImagePicker from 'react-native-image-crop-picker';

const BookingView = memo((props) => {
    const dispatch = useDispatch()
    const listBranchRedux = useSelector(state => state.bookingReducer.listBranch)
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const assetGroupRedux = useSelector(state => state.ortherReducer?.assetGroup)
    const assetRedux = useSelector(state => state.ortherReducer?.asset)

    const [listImageBanking, setListImageBanking] = useState([])
    const [showModalCalendar, setShowModalCalendar] = useState(false)


    const [branchForBooking, setBranchForBooking] = useState("")
    const [listTimeForBooking, setListTimeForBooking] = useState([
        {
            _id: '1',
            from: '09:00',
            to: '11:00'
        },
        {
            _id: '2',
            from: '11:00',
            to: '13:00'
        },
        {
            _id: '3',
            from: '13:00',
            to: '15:00'
        },
        {
            _id: '4',
            from: '15:00',
            to: '17:00'
        },
        {
            _id: '5',
            from: '17:00',
            to: '19:00'
        },
        {
            _id: '6',
            from: '19:00',
            to: '21:00'
        },
    ])

    const [currPickDate, setCurrPickDate] = useState(null)

    const [currTimeChoice, setCurrTimeChoice] = useState({})

    const [listServiceHasChoice, setListServiceHasChoice] = useState([])
    const [listAssetCodeChoice, setListAssetCodeChoice] = useState([])


    const [curAssetGroup, setCurAssetGroup] = useState('')


    useEffect(() => {
        if (_isEmpty(listBranchRedux)) {
            dispatch(getListBranchLocation())
        }
        dispatch(getAssetsGroup())
        dispatch(getAssets())
    }, [listBranchRedux])

    useEffect(() => {
        if(assetGroupRedux.length>0)
        {
            setCurAssetGroup(assetGroupRedux[0]?.code)
        }
    }, [assetGroupRedux])

    const _handleAssetChoice = (value) =>{
        var tmp = [...listAssetCodeChoice]
        if(tmp.indexOf(value)>-1)
        {
            tmp.splice(tmp.indexOf(value),1)
        }
        else
        {
            tmp.push(value)
        }
        setListAssetCodeChoice(tmp)
    }


    const _handleConfirmPickDate = (date) => {
        setCurrPickDate(moment(date).format())
        setShowModalCalendar(false)
    }

    const _handleConfirmCreateBooking = async () => {



        if (_isEmpty(listAssetCodeChoice) || !currPickDate || _isEmpty(currTimeChoice)) {
            return alertCustomNotAction(
                `Lỗi`,
                `Điền đầy đủ các trường cần thiết`
            )
        }

        let listImages = listImageBanking.map((i, index) => {
            return {
                uri: i.path,
                width: i.width,
                height: i.height,
                mime: i.mime,
                type: i.mime,
                name: `${i.modificationDate}_${index}`
            };
        })

        let resultUploadImage = await uploadModule({
            moduleName: 'videoCallRequest',
            files: listImages
        })
        if (resultUploadImage.isAxiosError) return

        let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);
        var date = new Date(currPickDate)
        let dataFetchCreateBooking = {
            appointmentDate: {
                from: new Date(date.getFullYear(), date.getMonth(), date.getDate(), currTimeChoice?.from?.split(':')[0], 0, 0),
                to: new Date(date.getFullYear(), date.getMonth(), date.getDate(), currTimeChoice?.from?.split(':')[1], 0, 0),
            },
            serviceCodeArr: listServiceHasChoice?.map(item => item?.code),
            desireCodeArr: listAssetCodeChoice,
            images:listIdImageHasUpload
        }


        let resultCreateNewBooking = await createVideoRequest(dataFetchCreateBooking);
        if (resultCreateNewBooking?.isAxiosError) return

        _clearAllState()
        navigation.navigate(ScreenKey.BOOKING_MAIN,{keyGoBack:"HOME"})
    }

    const _clearAllState = () => {
        setListAssetCodeChoice([])
        setCurrTimeChoice({})
        setListServiceHasChoice([])
        setCurrPickDate(null)
    }


    const _handlePickImage = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 6,
            mediaType: 'photo',
            // cropping:true,
            compressImageQuality: 0.5,
            compressImageMaxWidth: 700,
            // compressVideoPreset:'LowQuality' 
        }).then(async (images) => {

            setListImageBanking(old => [...old, ...images])
        }).catch(e => { });
    }


    return (
        <>
            <CalendarPickSingle
                confirm={_handleConfirmPickDate}
                setShowModalCalendar={(flag) => {
                    setShowModalCalendar(flag)
                }} show={showModalCalendar} />


          

            <View style={[styles.containTitle]}>
                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                    Thời gian hẹn {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>
                <TouchableOpacity onPress={() => {
                    setShowModalCalendar(true)
                }}>
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.BLUE_FB }]}>
                        {
                            currPickDate ?
                                moment(currPickDate).format('DD/MM/YYYY')
                                :
                                `Chọn ngày`
                        }
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.rowContent,{marginBottom:0}]}>
                <View style={[styles.listTime]}>
                    {
                        listTimeForBooking?.map((item, index) => {
                            if (item?._id == currTimeChoice?._id) {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.itemTime, styles.itemTimeActive]}>
                                        <Text style={[styles.titTime, styles.titTimeActive]}>
                                            {item?.from} - {item?.to}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                            return (
                                <TouchableOpacity
                                    onPress={() => setCurrTimeChoice(item)}
                                    key={index}
                                    style={[styles.itemTime]}>
                                    <Text style={[styles.titTime]}>
                                        {item?.from} - {item?.to}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    {/* <View style={[styles.itemTime, styles.itemTimeActive]}>
                        <Text style={[styles.titTime, styles.titTimeActive]}>
                            09:00 - 11:00
                        </Text>
                    </View> */}

                </View>
            </View>

            {/* <View style={[styles.containTitle]}>
                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                    Dịch vụ {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>
            </View> */}
{/* 
            <View style={[styles.rowContent]}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    <View style={[styles.listService]}>

                        {
                            listServiceHasChoice?.map((item, index) => {
                                return (
                                    <View key={item?._id} style={[styles.itemService, styles.itemServiceActive]}>
                                        <Image
                                            style={[styles.imgService, { backgroundColor: BG_GREY_OPACITY_5 }]}
                                            resizeMode="cover"
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                            }} />
                                        <View style={[styles.bottomService]}>
                                            <View style={[styles.priceService]}>
                                                <Text style={[styles.txtPrice]}>
                                                    {item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                </Text>
                                            </View>
                                            <View style={[styles.nameService]}>
                                                <Text numberOfLines={1} style={[styles.txtName]}>
                                                    {item?.name}
                                                </Text>
                                            </View>
                                            <View style={[styles.rateService]}>
                                                <CountStar small />
                                            </View>
                                            <TouchableOpacity onPress={() => {
                                                setListServiceHasChoice(olds => olds?.filter(itemFilter => itemFilter?._id !== item?._id))
                                            }}>
                                                <View style={[styles.chooseService, styles.chooseServiceActive]}>
                                                    <Text style={[styles.txtBtn, styles.txtActive]}>Bỏ chọn</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }



                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.PICK_SERVICE_TO_BOOKING, { setListServiceHasChoice, listServiceHasChoice })
                            }}
                            style={[styles.itemServiceAdd, { justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle: 'dashed' }]}>

                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), 
                                color: GREY }]}>
                            + Thêm
                           </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View> */}

            <View style={[styles.rowContent,{flexDirection:'column'}]}>
            <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                Hình ảnh {
                    <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
            </Text>
            <View style={{ flex: 1, marginTop:_moderateScale(16) }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {
                        listImageBanking?.map((item, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setListImageBanking(old => old.filter(itemFilter => itemFilter?.path !== item?.path))
                                        }}
                                        hitSlop={styleElement.hitslopSm}
                                        style={{
                                            backgroundColor: Color.RED,
                                            width: _moderateScale(8 * 2),
                                            height: _moderateScale(8 * 2),
                                            borderRadius: _moderateScale(8 * 2 / 2),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            zIndex: 1,
                                            right: 0
                                        }}>
                                        <View style={{
                                            width: _moderateScale(8),
                                            height: _moderateScale(1),
                                            backgroundColor: WHITE
                                        }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1 }}>
                                        <Image style={styles.btnAddImage} source={{ uri: item?.path }} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }

                    <TouchableOpacity
                        onPress={_handlePickImage}
                        style={styles.btnAddImage}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY, }]}>
                            + Thêm
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </View>

            <View style={[styles.containTitle]}>
                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                    Mong muốn: {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>
            </View>
                    {
                        console.log('----', curAssetGroup, listAssetCodeChoice)
                    }
            <View style={[styles.rowContent,{flexDirection:'column'}]}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <View style={[styles.cateAssetGroup]}>
                    {assetGroupRedux?.map((res, ind)=>{
                        return <TouchableOpacity 
                            onPress={()=>setCurAssetGroup(res?.code)}
                            style={[styles.itemAssetGroup,
                                curAssetGroup===res.code&&styles.itemAssetGroupActive
                            ]} key={ind}>
                            <Text style={[styles.itemAssetGroupText,
                                curAssetGroup===res.code&&styles.itemAssetGroupTextActive
                            ]}>{res?.name}</Text>
                        </TouchableOpacity>
                    })}
                </View>
                </ScrollView>
                <View style={[styles.cateAsset]}>
                    {assetRedux?.map((res, ind)=>{
                        return res?.codeGroup.indexOf(curAssetGroup)>-1?
                        <TouchableOpacity 
                            onPress={()=>_handleAssetChoice(res?.code)}
                            style={[styles.itemAsset,
                                listAssetCodeChoice.indexOf(res.code)>-1&&styles.itemAssetActive
                            ]} 
                            key={ind}>
                            <View style={[styles.assetTextContain]}>
                                {
                                    listAssetCodeChoice.indexOf(res.code)>-1?
                                    <Image style={[sizeIcon.xs, styles.checkIco]}  source={require('../../Icon/a_check.png')}/>:
                                    <Image style={[sizeIcon.xs, styles.checkIco]}  source={require('../../Icon/i_check.png')}/>
                                }
                                
                            <Text style={[styles.itemAssetText,
                            listAssetCodeChoice.indexOf(res.code)>-1&&styles.itemAssetTextActive
                            ]}> {res?.name}</Text>
                            </View> 
                        </TouchableOpacity>:
                        <></>
                    })}
                </View>
            </View>


         
            <View style={{ width: _moderateScale(340), alignSelf: 'center', marginBottom: 12 }}>
                <Button.ButtonPrimary pressAction={() => _handleConfirmCreateBooking()}
                    text={`Gửi yêu cầu`} height={40} />
            </View>

            <View style={{ height: 100 }} />


        </>
    );
});


const styles = StyleSheet.create({
    btnCheckCode__text: {
        fontSize: _moderateScale(14),
        color: WHITE
    },
    btnCheckCode: {
        backgroundColor: Color.BLUE_FB, height: '100%',
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'center'
    },
    inputCodeRef: {
        marginRight: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        color: Color.BLACK_OPACITY_8
    },
    containTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleMain: {
        fontSize: _moderateScale(16),
        color: GREY, marginLeft: _moderateScale(8 * 2)
    },
    rowContent: {
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2),
        marginTop: _moderateScale(8 * 3),
        marginBottom: _moderateScale(8 * 3)
    },
    listBranch: {
        flexDirection: "row"
    },
    itemBranch: {
        width: _moderateScale(150),
        height: _moderateScale(80),
        marginRight: _moderateScale(12),
        backgroundColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        padding: _moderateScale(12),
        paddingHorizontal: _moderateScale(20),
    },
    itemBranchActive: {
        backgroundColor: SECOND_COLOR
    },
    titItemBranch: {
        color: WHITE,
        fontSize: _moderateScale(18),
        ...stylesFont.fontNolan500
    },
    listTime: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: _moderateScale(4),
        justifyContent: 'space-between',
        paddingHorizontal: _moderateScale(8),
        paddingBottom: _moderateScale(16),

    },
    itemTime: {
        width: _moderateScale(105),
        marginTop: _moderateScale(8),
        borderColor: BG_GREY_OPACITY_9,
        alignItems: 'center',
        padding: _moderateScale(4),
        borderRadius: 4,
        borderWidth: 0.5,
    },
    itemTimeActive: {
        borderWidth: 0,
        backgroundColor: SECOND_COLOR
    },
    titTime: {
        color: BG_GREY_OPACITY_9,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    titTimeActive: {
        color: WHITE,
    },
    listService: {
        flexDirection: 'row',
        // paddingBottom: _moderateScale(24),
        paddingHorizontal: _moderateScale(12),
        alignItems:'center'
    },
    imgService: {
        width: '100%',
        height: _moderateScale(100),
        borderTopLeftRadius: _moderateScale(8),
        borderTopRightRadius: _moderateScale(8)
    },
    itemService: {
        width: _moderateScale(180),
        height: _moderateScale(200),
        marginRight: _moderateScale(8 * 2),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        shadowColor: BG_GREY_OPACITY_9,
        backgroundColor: WHITE,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    itemServiceAdd: {
        width: _moderateScale(80),
        height: _moderateScale(80),
        marginRight: _moderateScale(8 * 2),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        shadowColor: BG_GREY_OPACITY_9,
        backgroundColor: WHITE,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    bottomService: {
        position: 'relative',
        width: '100%',
        flex: 1
    },
    priceService: {
        backgroundColor: SECOND_COLOR,
        alignItems: 'center',
        paddingVertical: _moderateScale(2),
        borderRadius: _moderateScale(4),
        position: 'absolute',
        top: _moderateScale(-8),
        right: 0,
        paddingHorizontal: _moderateScale(8 * 1.5)
    },
    nameService: {
        flexDirection: 'row',
        marginTop: _moderateScale(16),
        paddingHorizontal: _moderateScale(16),

    },
    rateService: {
        flexDirection: 'row',
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(16),

    },
    chooseService: {
        flexDirection: 'row',
        width: 160,
        alignSelf: 'center',
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(16),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(20),
        justifyContent: 'center',
        borderColor: SECOND_COLOR,
        borderWidth: 1
    },
    chooseServiceActive: {
        backgroundColor: SECOND_COLOR,
        borderWidth: 0
    },
    txtName: {
        color: SECOND_COLOR,
        fontSize: _moderateScale(14)
    },
    txtPrice: {
        color: WHITE,
        fontSize: _moderateScale(14)
    },
    txtBtn: {
        color: SECOND_COLOR
    },
    txtActive: {
        color: WHITE
    },
    input: {
        width: _widthScale(300),
        color: Color.GREY,
        padding: _moderateScale(12),
        fontSize: _widthScale(14),
        marginHorizontal: _moderateScale(16),
        maxHeight: _moderateScale(40),
        padding: _moderateScale(8),
        borderBottomWidth: 1,
        borderColor: SECOND_COLOR
    },
    btnAddImage: {
        marginHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: _moderateScale(8),
        width: _moderateScale(8 * 10),
        height: _moderateScale(8 * 10),
        borderStyle: 'dashed'
    },
    cateAssetGroup:{
        paddingHorizontal: _moderateScale(8*2),
        flexDirection:'row',
    },
    itemAssetGroup:{
        borderWidth: 0.5,
        marginRight: _moderateScale(8),
        borderRadius:_moderateScale(12),
        minWidth:_moderateScale(80),
        borderColor:GREY,
        alignItems:'center',
        padding: _moderateScale(2)
    },
    itemAssetGroupActive:{
        borderColor:SECOND_COLOR,
        backgroundColor:SECOND_COLOR
    },
    itemAssetGroupText:{
        color: GREY
    },
    itemAssetGroupTextActive:{
        color: WHITE
    }, 
    cateAsset:{
        marginHorizontal:_moderateScale(8*2),
        marginVertical: _moderateScale(8*2)
    },
    itemAsset:{
        alignSelf:'flex-start',
        marginTop:_moderateScale(12)
    },
    assetTextContain:{
        justifyContent:'center',
        flexDirection:'row',
    },
    itemAssetTextActive:{
        color: SECOND_COLOR
    },
    checkIco:{
        marginRight: _moderateScale(4)
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
}


export default BookingView;