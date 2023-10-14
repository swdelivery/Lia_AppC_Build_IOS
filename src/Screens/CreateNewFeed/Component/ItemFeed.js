import React, { memo , useState} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View,TextInput,Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from '../../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BLACK_OPACITY_8, BLUE_TITLE, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';

import ItemDiary from './ItemDiary';
import ListImage from './ListImage';
import { navigation } from '../../../../rootNavigation';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty'
import ItemInput from './ItemInput';
import _map from 'lodash/map'
import _get from 'lodash/get'

import { createPost } from '../../../Redux/Action/PostAction';
import { uploadModule } from '../../../Redux/Action/BookingAction';
import { isEmpty } from 'lodash-es';

const ItemFeed = function ItemFeed(props) {
    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const currentTreatmentDiaryRedux = useSelector(state => state?.partnerDiaryReducer?.currentPartnerDiary)

    const [shareDiary, setShareDiary] = useState(false)
    const [shareImage, setShareImage] = useState(false)
    const [listImage, setListImage] = useState([])
    const [template, setTemplate] = useState({})
    const [content, setContent] = useState('')
    const [hiddenIdArr, setHiddenIdArr] = useState([])



    const _handleDiary = ()=>{
        dispatch({
            type:'SET_CURRENT_TREATMENT_DIARY',
            payload: {}
        })
        // navigation.navigate(ScreenKey.MODAL_LIST_DIARY,{
        //     onGoBack: setShareDiary(true),
        //   })
    }
    

   const _handlePost = async () =>{

    if(isEmpty(currentTreatmentDiaryRedux?.id))
    {
        return Alert.alert(
            "Thông báo",
            `Bạn chưa chọn nhật ký muốn chia sẻ`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    let imageTemp = []
    listImage.map((i, index) => {
        //ảnh local up lên
        imageTemp.push({
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
            type: i.mime,
            name: `${i.modificationDate}_${index}`
        }) 
    })
    let listIdImageHasUpload = []

    if(imageTemp.length>0)
    {
        let resultUploadImage = await uploadModule({
            moduleName: 'partnerPost',
            files: imageTemp
        })
        if (resultUploadImage.error)
        { 
            return
        }

        resultUploadImage?.data?.data?.map((item)=>{
            listIdImageHasUpload.push(item.id)
        })

    }
    var data = {
            "content": content,
            "images": listIdImageHasUpload,
            "template": {
                "type": "PartnerDiary_TreatmentDetail",
                "data":{
                     "partnerDiaryId":currentTreatmentDiaryRedux?.id
                }
            },
            "hiddenIdArr": hiddenIdArr
        }
     
        dispatch(createPost(data))

        navigation.goBack()
    }

    const _handleDelImage = (path) =>{
        setListImage(old => [...old.filter(item=>item.path!==path)])
    }

    const _handleSetListImage = (images) =>{
        console.log(images)
        setListImage(old=>[...old, ...images])
    }

    const _handleHiddenImage = (id) => {
        if (hiddenIdArr.indexOf(id) > -1) {
            setHiddenIdArr(old => [...old.filter(item => item !== id)])
        }
        else {
            setHiddenIdArr(old => {
                return [...old, id]
            })
        }
    }

    return (
        <> 
           <View style={[styles.itemFeed]}>
                    <View style={[styles.headOfFeed]}>
                        <View style={[styles.leftOfHead]}>
                            <FastImage
                                style={[styles.bannerProfile__avatar]}
                                uri={infoUserRedux?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                            />
                            <View style={[styles.titOfFeed]}>
                                <Text style={[styles.titFeed]}>{infoUserRedux?.name}</Text>
                                <Text style={[styles.timeFeed]}>{moment().format('LLL')}</Text>
                            </View>
                        </View>
                        {/* <TouchableOpacity style={[styles.moreFeed]}>
                        <Image 
                            source={require('../../../Image/component/more.png')} />
                        </TouchableOpacity> */}
                    </View>

                    <View style={[styles.contentFeed]}> 
                        
                        <ItemInput setContent={setContent}/>

                        <View style={[styles.extensionFeed]}>
                            <TouchableOpacity 
                            onPress={()=>setShareImage(!shareImage)}
                            style={[styles.itemExtension]}>
                                <Image 
                                style={[sizeIcon.xs]}
                                source={require('../../../Image/component/i_picture.png')} />
                                <Text style={[styles.textExtension]}>Hình ảnh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={_handleDiary}
                            style={[styles.itemExtension]}>
                                <Image 
                                style={[sizeIcon.xs]}
                                source={require('../../../Image/component/i_share.png')} />
                                <Text style={[styles.textExtension]}>Nhật ký</Text>
                            </TouchableOpacity>
                        </View>

                        {shareImage?<ListImage data={listImage} 
                            setImage={_handleSetListImage} 
                            delImage={_handleDelImage}/>
                            :<></>}
                    </View>
                    {/* end feed content */}

                </View>
                    {/* enditemFeed */} 
                {shareDiary?<ItemDiary hiddenIdArr={hiddenIdArr} 
                            _handleHiddenImage={_handleHiddenImage} />:<></>}

                <TouchableOpacity 
                    onPress={_handlePost}
                    style={{backgroundColor: BASE_COLOR,
                    width: _widthScale(240),
                    paddingVertical: _moderateScale(8),
                    marginTop: _moderateScale(8*2),
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: _moderateScale(24)}}>
                        <Text style={{color: WHITE, fontSize: _moderateScale(16), ...stylesFont.fontNolan500}}>Đăng bài</Text>
                </TouchableOpacity>  
        </>
    )
}


const styles = StyleSheet.create({
    input: {
        flex: 1,
        padding: _moderateScale(12),
        fontSize: _widthScale(14),
        padding: _moderateScale(8),
        minHeight: _moderateScale(120),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_3,
        backgroundColor: BG_GREY_OPACITY_3,
        marginBottom: _moderateScale(16),
        color: BLACK_OPACITY_8,
        borderRadius: _moderateScale(8)
    },
    extensionFeed:{
        flexDirection: 'row',
        paddingBottom: _moderateScale(8*1.5),
        borderBottomWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5,
        marginBottom: _moderateScale(8*2)
    },
    itemExtension:{
        flexDirection: 'row',
        marginRight: _moderateScale(12)
    },
    textExtension:{
        marginLeft: _moderateScale(6),
        fontSize: _moderateScale(14),
        color: BLACK_OPACITY_8
    },
    bannerProfile__avatar: {
        width: _moderateScale(48),
        height: _moderateScale(48),
        borderRadius: _moderateScale(48),
        borderWidth: _moderateScale(2),
        backgroundColor:WHITE,
        borderColor: WHITE,
    },
    ///------start feed-----///
    itemFeed:{
       backgroundColor:WHITE,
       marginTop: _moderateScale(8),
       borderRadius: _moderateScale(8),
       paddingHorizontal: _moderateScale(8*2) ,
       paddingVertical: _moderateScale(8) 

    },
    headOfFeed:{
        flexDirection: 'row',
        marginBottom: _moderateScale(8*2)
    },
    leftOfHead:{
        flex:1,
        flexDirection: 'row',
    },
    titOfFeed:{
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4)
    },
    titFeed:{
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    timeFeed:{
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(10)
    },
    moreFeed:{
       marginTop: _moderateScale(8)
    },
    contentFeed:{
        flex: 1
    },
    textFeed: {
        flex: 1,
        fontSize: _moderateScale(13),
    },
    shareFeed:{
        flex:1,
        marginTop: _moderateScale(8*3)
    },
    headShare:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    titShare:{
        marginLeft: _moderateScale(4),
        color: BLUE_TITLE,
        ...stylesFont.fontNolan500
    },
    contentShare:{
        flexDirection:'row',
        marginTop: _moderateScale(8)
    },
    imgShare:{
        width: _widthScale(8*6),
        height: _heightScale(8*6),
        marginRight: _moderateScale(8)
    },
    briefContentShare:{
        flex:1,
    },
    titContentShare:{
        fontSize: _moderateScale(16),
        color: SECOND_COLOR,
        marginBottom: _moderateScale(4)
    },
    descriptionShare:{
        fontSize: _moderateScale(11),
        color: GREY_FOR_TITLE,
        fontStyle: 'italic'
    },
    actionFeed:{
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        // borderTopWidth: _heightScale(0.5),
        borderBottomWidth: _heightScale(0.5),
        marginTop: _moderateScale(6),
        paddingVertical: _moderateScale(8*1.5),
        borderColor: BG_GREY_OPACITY_5,
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(8*2),
        borderRadius: _moderateScale(4),
        paddingVertical: _moderateScale(12)
    },
    itemActionFeed:{
        flexDirection: 'row',
        flex: 0.5,
        justifyContent:'center',
        alignItems:'center'
    },
    titAction:{
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(4)
    },

    ///-----end feed-----///
   
   
})


export default ItemFeed
