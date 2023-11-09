import React, { memo, useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { BASE_COLOR, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BLACK_OPACITY_8, BLUE, BLUE_OCEAN, GREY, GREY_FOR_TITLE, SECOND_COLOR, WHITE, BG_GREY_OPACITY_2 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import ImagePicker from 'react-native-image-crop-picker';
import  _get from 'lodash/get'
import _findIndex from 'lodash/findIndex'
import _isEmpty from 'lodash/isEmpty'

import { useSelector, useDispatch } from 'react-redux';
import { uploadModule} from '../../../Redux/Action/BookingAction';
import { updateDailyDiary } from '../../../Redux/Action/Diary';
import { URL_ORIGINAL } from '../../../Constant/Url';
import DialogConfirmInput from '../../../Components/Dialog/ConfirmTextInput';


const itemDate = memo(function itemDate(props) {  
    const dispatch = useDispatch()


    const [dataMain, setDataMain] = useState(null)
    const [actionType, setActionType] = useState('')
    const [morning, setMorning] = useState(['Vệ sinh', 'Uống thốc', 'Kiêng cử'])
    const [afternoon, setAfternoon] = useState(['Vệ sinh', 'Uống thốc', 'Kiêng cử'])
    const [evening, setEvening] = useState(['Vệ sinh', 'Uống thốc', 'Kiêng cử'])
    const [listImage, setListImage] = useState([])
    const [isDialogVisible, setDialogVisible] = useState(false)


    useEffect(() => {
       
        if(props?.data!==null)
        {
            // setDataMain(props?.data?.dailyDiaryArr[props?.index])
            var data = ['Vệ sinh', 'Uống thốc', 'Kiêng cử']
            setDataMain(props?.data)
            setListImage(props?.data?.images)

            //set mornig
            var morningTmp = props?.data?.morning
            console.log(props?.data)

            console.log({morningTmp})
            let difference = morningTmp.filter(x => !data.includes(x));
            setMorning(old=>[...data, ...difference])
            //noon
            var afternoonTmp = props?.data?.noon
            let difference1 = afternoonTmp.filter(x => !data.includes(x));
            setAfternoon(old=>[...data, ...difference1])
            //evening
            var eveningTmp = props?.data?.evening
            let difference2 = eveningTmp.filter(x => !data.includes(x));
            setEvening(old=>[...data, ...difference2])

        }
    }, [props?.data])


    const _handleAction = (pro, data) =>{
        var newDaily = dataMain
        var index = newDaily[pro].indexOf(data)
        console.log('data', newDaily, data, pro)

        console.log('newDaily[pro]', newDaily[pro])
        console.log('index', index)
        if(index > -1)
        {
            newDaily[pro].splice(index,1)
        }
        else
        {
            newDaily[pro].push(data)
        }
        
        setDataMain(old=> {
            return {
                ...old,
                [pro]:newDaily[pro]
            }
        })
    }
    
    const _handleContent = (pro, data) =>{
        setDataMain(old=> {
            return {
                ...old,
                [pro]:data
            }
        })
    }


    const _handlePickImage = async (type) => {
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

          
            if(type!=='other')
            {
                var img = {type:type,
                    image:{}}
                setListImage(old => [...old.filter(item=>item.type!==type)])
                img.image = images[0]
                setListImage(old => [...old, img])
            }
            else
            {
                var tmp = []
                images.map((res)=>{
                    var img = {type:type,
                        image:res}
                    tmp.push(img)
                })

                setListImage(old => [...old,...tmp ])
            }
           
        }).catch(e => { });
    }

    const _handleDelImage = (type, action, path)=>{
        if(type==='other' && action === 'del')
        {
            setListImage(old => [...old.filter(item=>item.image.path!==path)])
        }
    }
    
    const _handleComplete = async (isComplete) => {
        let imgExistOnServer = []
        let imageTemp = []
        listImage.map((i, index) => {
            //ảnh local up lên
            if(_get(i,'image.id','')==='')
            {
                imageTemp.push({
                    uri: i.image.path,
                    width: i.image.width,
                    height: i.image.height,
                    mime: i.image.mime,
                    type: i.image.mime,
                    name: `${i.image.modificationDate}_${index}`,
                    oldType: i.type
                }) 
            }
            else
            {
                // ảnh đã có trên server
                imgExistOnServer.push({
                    type: i?.type,
                    image: i?.image?.id
                })
            }
        })


        let listIdImageHasUpload = []


        if(imageTemp.length>0)
        {
            let resultUploadImage = await uploadModule({
                moduleName: 'dailyDiary',
                files: imageTemp
            })
            if (resultUploadImage.error)
            { 
                return
            }
    
            resultUploadImage?.data?.data?.map((item)=>{
                var name =  item.originalName.split('.')
                var index = imageTemp.findIndex(item=> item.name === name[0] )
    
                if(index>-1)
                {
                    var imgToUp = {
                        type: imageTemp[index].oldType,
                        image: item.id
                    }
                    listIdImageHasUpload.push(imgToUp)
                }
            })
    
        }
        // console.log('dataMain', imgExistOnServer, listIdImageHasUpload)

        dataMain.images = [...imgExistOnServer, ...listIdImageHasUpload]
        dataMain.isComplete = isComplete
        dispatch(updateDailyDiary(dataMain?.id, dataMain))
    }

    // console.log('listImg', listImage)
  
    const _confirmAddAction = (text) =>{
        if(actionType === 'morning')
        {
            setMorning(old=>[...old,text ])
        }
        if(actionType === 'afternoon')
        {
            setAfternoon(old=>[...old,text ])
        }
        if(actionType === 'evening')
        {
            setEvening(old=>[...old,text ])
        }
    }

    return (
        <> 
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
        <DialogConfirmInput
                title={"Thêm hành động"}
                message={"Nhập hành động muốn thêm \n vào bên dưới"}
                value={``}
                handleCancel={() => {
                    setDialogVisible(null)
                }}
                handleConfirm={(textInput) => {
                    _confirmAddAction(textInput)
                }}
                visible={Boolean(isDialogVisible)} />
                
            <View style={[styles.titleRow]}>
                    <Text style={[styles.titSection]}>Buổi sáng</Text>
                    <TouchableOpacity
                    onPress={()=>{
                        setDialogVisible(true)
                        setActionType('morning')
                    }}
                    >
                         <Image
                                style={[sizeIcon.xxs]}
                                source={require('../../../Image/component/plus_base.png')} />
                    </TouchableOpacity>
                </View>

            <View style={[styles.listAction]}>
                    {morning.map((item, ind)=>{
                        var morningChoose = dataMain?.morning?dataMain?.morning:[]
                        return morningChoose.indexOf(item)>-1?
                                <TouchableOpacity key={ind}
                                    onPress={()=>_handleAction('morning', item)}
                                    style={[styleElement.rowAliCenter,{marginRight:_moderateScale(16), marginBottom: _moderateScale(20)}]}>
                                    <Image style={[sizeIcon.lg]}  source={require('../../../Icon/a_check.png')}/>
                                    <Text style={[stylesFont.fontNolan500,{marginLeft:_moderateScale(8),
                                        fontSize:_moderateScale(14), color: SECOND_COLOR}]}>
                                    {item}
                                    </Text>
                                </TouchableOpacity>:
                                <TouchableOpacity key={ind}
                                onPress={()=>_handleAction('morning', item)}
                                style={[styleElement.rowAliCenter,{marginRight:_moderateScale(16), marginBottom: _moderateScale(20)}]}>
                                    <Image style={[sizeIcon.lg]}  source={require('../../../Icon/i_check_grey.png')}/>
                                    <Text style={[stylesFont.fontNolan500,{marginLeft:_moderateScale(8),
                                        fontSize:_moderateScale(14), color: GREY_FOR_TITLE}]}>
                                    {item}
                                    </Text>
                                </TouchableOpacity>     
                    })}
                </View>

             <View style={[styles.titleRow]}>
                    <Text style={[styles.titSection]}>Buổi trưa</Text>
                    <TouchableOpacity
                    onPress={()=>{
                        setDialogVisible(true)
                        setActionType('afternoon')
                    }}>
                       <Image
                                style={[sizeIcon.xxs]}
                                source={require('../../../Image/component/plus_base.png')} />
                    </TouchableOpacity>
                </View>

            <View style={[styles.listAction]}>
                {afternoon.map((item, ind)=>{
                        var afternoonChoose = dataMain?.noon?dataMain.noon:[]
                        return afternoonChoose.indexOf(item)>-1?
                                <TouchableOpacity key={ind}
                                onPress={()=>_handleAction('noon', item)}
                                    style={[styleElement.rowAliCenter,{marginRight:_moderateScale(16), marginBottom: _moderateScale(20)}]}>
                                    <Image style={[sizeIcon.lg]}  source={require('../../../Icon/a_check.png')}/>
                                    <Text style={[stylesFont.fontNolan500,{marginLeft:_moderateScale(8),
                                        fontSize:_moderateScale(14), color: SECOND_COLOR}]}>
                                    {item}
                                    </Text>
                                </TouchableOpacity>:
                                <TouchableOpacity key={ind}
                                onPress={()=>_handleAction('noon', item)}
                                style={[styleElement.rowAliCenter,{marginRight:_moderateScale(16), marginBottom: _moderateScale(20)}]}>
                                    <Image style={[sizeIcon.lg]}  source={require('../../../Icon/i_check_grey.png')}/>
                                    <Text style={[stylesFont.fontNolan500,{marginLeft:_moderateScale(8),
                                        fontSize:_moderateScale(14), color: GREY_FOR_TITLE}]}>
                                    {item}
                                    </Text>
                                </TouchableOpacity>     
                    })}
                </View>

            <View style={[styles.titleRow]}>
                    <Text style={[styles.titSection]}>Buổi tối</Text>
                    <TouchableOpacity
                    onPress={()=>{
                        setDialogVisible(true)
                        setActionType('evening')
                    }}
                    >
                         <Image
                                style={[sizeIcon.xxs]}
                                source={require('../../../Image/component/plus_base.png')} />
                    </TouchableOpacity>
                </View>

             <View style={[styles.listAction]}>
                {evening.map((item, ind)=>{
                        var eveningChoose = dataMain?.evening?dataMain.evening:[]
                        return eveningChoose.indexOf(item)>-1?
                                <TouchableOpacity key={ind}
                                onPress={()=>_handleAction('evening', item)}
                                    style={[styleElement.rowAliCenter,{marginRight:_moderateScale(16), marginBottom: _moderateScale(20)}]}>
                                    <Image style={[sizeIcon.lg]}  source={require('../../../Icon/a_check.png')}/>
                                    <Text style={[stylesFont.fontNolan500,{marginLeft:_moderateScale(8),
                                        fontSize:_moderateScale(14), color: SECOND_COLOR}]}>
                                    {item}
                                    </Text>
                                </TouchableOpacity>:
                                <TouchableOpacity key={ind}
                                onPress={()=>_handleAction('evening', item)}
                                style={[styleElement.rowAliCenter,{marginRight:_moderateScale(16), marginBottom: _moderateScale(20)}]}>
                                    <Image style={[sizeIcon.lg]}  source={require('../../../Icon/i_check_grey.png')}/>
                                    <Text style={[stylesFont.fontNolan500,{marginLeft:_moderateScale(8),
                                        fontSize:_moderateScale(14), color: GREY_FOR_TITLE}]}>
                                    {item}
                                    </Text>
                                </TouchableOpacity>     
                    })}
                </View>

             <View style={[styles.titleRow]}>
                    <Text style={[styles.titSection]}>Ghi chú</Text>
                    {/* <TouchableOpacity>
                        <Text style={[styles.actionRow]}>Thêm</Text>
                    </TouchableOpacity> */}
                </View>
                
            <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize: _moderateScale(11), marginLeft: _moderateScale(8*2), color:GREY_FOR_TITLE}}>Hôm nay bạn cảm thấy thế nào?</Text>
                    <View style={[styles.input,{backgroundColor:BG_GREY_OPACITY_2}]}>
                        <TextInput
                        multiline={true}
                        style={{ flex: 1,
                        }}
                        onChangeText={(text)=>{
                           // console.log(text)
                         _handleContent('description', text)
                        }}
                        value={dataMain?.description} />
                    </View>
                </View>

            <View style={[styles.titleRow], {
                    marginHorizontal: _moderateScale(8*2),
                    flexDirection:'column', marginTop: _moderateScale(8*3)}}>
                    <Text style={[styles.titSection]}>Hình ảnh</Text>
                    <Text style={{fontSize:_moderateScale(10)}}>
                        Cập nhật tối thiểu 3 hình ảnh (*): trái, phải, chính diện.
                    </Text>
                </View>

                <View style={{flexDirection: 'row', 
                marginTop: _moderateScale(16),
                marginHorizontal: _moderateScale(8*2)}}> 


                    <View style={[styles.itemImage]}>
                        <Text style={[styles.textImage]}>Trái</Text>
                        {
                            listImage?.map((item,index)=>{
                                
                                return  item.type==='left'?<TouchableOpacity
                                        style={[styles.contentImage]}
                                        onPress={()=>_handlePickImage('left')}>
                                            <Image
                                                style={[styles.imageV]}
                                                source={{ uri: `${_get(item,'image.id','')!==''?`${URL_ORIGINAL}/`:''}${item?.image?.path}` }} />
                                    </TouchableOpacity>
                                    :<></>
                            })
                             
                        }
                          {
                          _findIndex(listImage,{type:'left'})<0?<TouchableOpacity
                                onPress={()=>_handlePickImage('left')}
                                style={[styles.btnAddImage,{marginTop: _moderateScale(0)}]}>
                            <Image
                                style={[sizeIcon.lg]}
                                source={require('../../../Image/component/plus.png')} />
                            </TouchableOpacity>:<></>
                            }
                    </View>

                    <View style={[styles.itemImage]}>
                        <Text style={[styles.textImage]}>Chính diện</Text>
                     
                        {
                            listImage?.map((item,index)=>{
                                
                                return  item.type==='front'?<TouchableOpacity
                                        style={[styles.contentImage]}
                                        onPress={()=>_handlePickImage('front')}>
                                            <Image
                                                style={[styles.imageV]}
                                                source={{ uri: `${_get(item,'image.id','')!==''?`${URL_ORIGINAL}/`:''}${item?.image?.path}` }} />
                                    </TouchableOpacity>
                                    :<></>
                                    
                            })
                        }
                         { _findIndex(listImage,{type:'front'})<0?<TouchableOpacity
                                onPress={()=>_handlePickImage('front')}
                                style={[styles.btnAddImage,{marginTop: _moderateScale(0)}]}>
                            <Image
                                style={[sizeIcon.lg]}
                                source={require('../../../Image/component/plus.png')} />
                            </TouchableOpacity>:<></>
                            }
                    </View>
                    <View style={[styles.itemImage]}>
                        <Text style={[styles.textImage]}>Phải</Text>
                        {
                            listImage?.map((item,index)=>{
                                
                                return  item.type==='right'?<TouchableOpacity
                                        style={[styles.contentImage]}
                                        onPress={()=>_handlePickImage('right')}>
                                            <Image
                                                style={[styles.imageV]}
                                                source={{ uri: `${_get(item,'image.id','')!==''?`${URL_ORIGINAL}/`:''}${item?.image?.path}` }} />
                                    </TouchableOpacity>
                                    :<></> 
                            })
                        }
                         {_findIndex(listImage,{type:'right'})<0?<TouchableOpacity
                                onPress={()=>_handlePickImage('right')}
                                style={[styles.btnAddImage,{marginTop: _moderateScale(0)}]}>
                            <Image
                                style={[sizeIcon.lg]}
                                source={require('../../../Image/component/plus.png')} />
                            </TouchableOpacity>:<></>
                            }
                    </View>

                </View> 
 
                <View style={{flexDirection: 'row', 
                marginTop: _moderateScale(16),
                marginHorizontal: _moderateScale(8*5)}}> 
                <Text style={[styles.textImage]}>Khác</Text>
                </View>
                <View style={{flexDirection: 'row', 
                marginTop: _moderateScale(16),
                flexWrap:'wrap',
                marginHorizontal: _moderateScale(8*2)}}> 

                     {
                            listImage?.map((item,index)=>{
                                return  item.type==='other'&&<View style={[styles.itemImage]}>
                                        <TouchableOpacity key={index}
                                            style={[styles.contentImage]}
                                            onPress={()=>_handleDelImage('other','del', item?.image?.path)}>
                                                <Image
                                                    style={[styles.imageV]}
                                                    source={{ uri: `${_get(item,'image.id','')!==''?`${URL_ORIGINAL}/`:''}${item?.image?.path}` }} 
                                                    // source={{ uri: `https://fontsme.com/wp-data/l/361/3361/slide/slipsum-0.png` }} 
                                                    />
                                        </TouchableOpacity>
                                </View>
                            }) 
                        }
                    
                    <TouchableOpacity
                        onPress={()=>_handlePickImage('other')}
                        style={styles.btnAddImage}>
                       <Image
                        style={[sizeIcon.lg]}
                        source={require('../../../Image/component/plus.png')} />
                    </TouchableOpacity>
                    
                </View> 

                 
                <View style={{flexDirection: 'row', 
                marginTop: _moderateScale(56),
                justifyContent:'space-between',
                flexWrap:'wrap',
                alignSelf: 'center',
                justifyContent:'center',
                marginBottom: _moderateScale(8*8),
                marginHorizontal: _moderateScale(8*2)}}> 
                    <TouchableOpacity 
                    onPress={()=>_handleComplete(false)}
                    style={[styles.btnOptions]}>
                        <Text style={{color: WHITE, fontSize: _moderateScale(14)}}>Cập nhật</Text>
                    </TouchableOpacity>
                    {
                        (dataMain?.morning?.length>0&&
                        dataMain?.noon?.length>0&&
                        dataMain?.evening?.length>0&&
                        _findIndex(listImage,{type:'left'})>-1&&
                        _findIndex(listImage,{type:'front'})>-1&&
                        _findIndex(listImage,{type:'right'})>-1)?
                        <TouchableOpacity 
                        onPress={()=>_handleComplete(true)}
                        style={[styles.btnOptions,{backgroundColor: BLUE_OCEAN, borderColor: BLUE_OCEAN}]}> 
                        <Text style={{color: WHITE, fontSize: _moderateScale(14)}}>Hoàn thành</Text>
                    </TouchableOpacity>:<></>
                    }
                    
                </View>
                </ScrollView>
        </>
    )
})


const styles = StyleSheet.create({
    input: {
        flex: 1,
        padding: _moderateScale(12),
        fontSize: _widthScale(14),
        marginHorizontal: _moderateScale(16),
        padding: _moderateScale(8),
        minHeight: _moderateScale(80),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_3,
        backgroundColor: BG_GREY_OPACITY_3,
        marginTop: _moderateScale(10),
        color: BLACK_OPACITY_8,
        borderRadius: _moderateScale(8)
    },
    btnOptions: {
        width: _moderateScale(140),
        borderWidth: 0.5,
        borderColor: BASE_COLOR,
        backgroundColor: BASE_COLOR,
        paddingVertical: _moderateScale(8),
        borderRadius: _moderateScale(24),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: _moderateScale(12)
    },
    container: {
        flex: 1,
        backgroundColor: SECOND_COLOR
    },
    title: {
        fontSize: _moderateScale(20),
        color: WHITE,
    },

    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(130),
        width: "100%",
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(130), 0, _moderateScale(130), _moderateScale(130) + 1],
                    outputRange: [-_moderateScale(130) / 2, 0, _moderateScale(130) * 0.75, _moderateScale(130) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(130), 0, _moderateScale(130), _moderateScale(130) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),

    itemTab:{
        backgroundColor: BLUE,
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        marginRight: _moderateScale(8),
        borderRadius: _moderateScale(8),
        alignItems:'center'
    },
    textTab:{
        fontSize: _moderateScale(13),
        color: GREY
    } ,
    briefTab:{
        fontSize: _moderateScale(10),
        color: GREY
    },
    itemTabActive:{
        backgroundColor: SECOND_COLOR
    },
    textTabActive:{
        color: WHITE
    },
    briefTabActive:{
        fontSize: _moderateScale(10),
        color: WHITE
    },
    titleRow:{
        flexDirection: 'row', 
        marginTop: _moderateScale(8),
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: _moderateScale(8*2)
    },
    titSection:{
        fontSize: _moderateScale(16),
        ...stylesFont.fontNolan500
    },
    actionRow:{
        fontSize: _moderateScale(13),
        color:SECOND_COLOR
    },
    listAction: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: WHITE,
        flexDirection:'row',
        flexWrap:'wrap',
        borderRadius: _moderateScale(4),
        marginTop: _moderateScale(16),
        minHeight: _moderateScale(36)
    },
    itemImage:{
        width: _widthScale(8*10),
        // height: _heightScale(8*10),
        marginRight: _moderateScale(16),
    },
    contentImage:{
        borderWidth: 0.5,
        padding: _moderateScale(4),
        borderColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8)
    },
    imageV:{
        width: _widthScale(8*9),
        height: _heightScale(8*9),
        borderRadius: _moderateScale(4)
    },
    textImage:{
        color: SECOND_COLOR,
        ...stylesFont.fontNolanBold,
        alignSelf: 'center',
        fontSize: _moderateScale(14),
        marginBottom: _moderateScale(6)
    },
     btnAddImage: {
        marginHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: GREY,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: _moderateScale(32),
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderStyle: 'dashed',
        alignSelf:'center',
        justifyContent: 'center'
    },
})



export default itemDate
