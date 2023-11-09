import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View ,ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BG_GREY_OPACITY_9, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, TITLE_GREY, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import FastImage from '../../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ListComment from './ListComment'
import ScreenKey from '../../../Navigation/ScreenKey';
import ListImage from './ListImage';
import ActionFeed from './ActionFeed';
import { SET_CURRENT_POST, SET_IS_FOCUS_COMMENT } from '../../../Redux/Constants/ActionType';


const ItemFeed = (props)=> {
    const dispatch = useDispatch()
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)
    const [lengthMore,setLengthMore] = useState(false);

    _handleDetail = () =>{
        dispatch({ 
            type: SET_CURRENT_POST,
            payload: props?.data
        })
        dispatch({
            type: SET_IS_FOCUS_COMMENT,
            payload: false
        })
        navigation.navigate(ScreenKey.DETAIL_NEW_FEED)
    }

   const _handleEditFeed = () =>{
        dispatch({
            type: SET_CURRENT_POST,
            payload: props?.data
        })
        navigation.navigate(ScreenKey.EDIT_NEW_FEED)
   }
    
    return (
        <> 
           <TouchableOpacity 
                            onPress={_handleDetail} style={[styles.itemFeed]}>
                    <View style={[styles.headOfFeed]}>
                        <View style={[styles.leftOfHead]}>
                            <FastImage
                                style={[styles.bannerProfile__avatar]}
                                uri={props?.data?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                            />
                            <View style={[styles.titOfFeed]}>
                                <Text style={[styles.titFeed]}>{props?.data?.partner?.name}</Text>
                                <Text style={[styles.timeFeed]}>{moment(props?.data?.created).fromNow()}</Text>
                            </View>
                        </View>
                        
                        {infoUserRedux?._id === props?.data?.partnerId?
                         <TouchableOpacity
                         hitSlop={{top: 50, bottom:50, left:50, right:50}}
                         onPress={()=>_handleEditFeed()}
                         style={[styles.moreFeed]}>
                         <Image 
                             source={require('../../../Image/component/more.png')} />
                         </TouchableOpacity>
                        :<></>
                        }
                    </View>

                    <View style={[styles.contentFeed]}> 
                        <Text  
                        numberOfLines={8} 
                        onTextLayout={(e)=>setLengthMore(e.nativeEvent.lines.length >=4)}
                        style={[styles.textFeed]}>
                           {`${props?.data?.content}`}
                        </Text>
                        {
                            lengthMore ? <TouchableOpacity 
                            onPress={_handleDetail}><Text
                                style={{ 
                                    color: BLUE_FB,lineHeight: 21, marginTop: _moderateScale(4) }}>{'Xem tiếp...'}</Text></TouchableOpacity> 
                                :null
                        }

                        <ListImage data={props?.data?.images?props?.data?.images:[]}/>

                        
                        <TouchableOpacity 
                        onPress={_handleDetail}
                        style={[styles.shareFeed]}>
                            <View style={[styles.headShare]}>
                                <Image 
                                style={[sizeIcon.xs]}
                                source={require('../../../Image/component/share.png')} />
                                <Text style={[styles.titShare]}>
                                    Đã chia sẻ
                                </Text>
                            </View>
                            {
                                props?.data?.template?.type==="TreatmentDiary"?
                                <View style={[styles.contentShare]}>
                                    <Image 
                                        style={[styles.imgShare]}
                                        source={require('../../../Image/component/logoLinear.png')} />
                                    <View style={[styles.briefContentShare]}> 
                                        <Text style={[styles.titContentShare]}>
                                            {`NHẬT KÝ ĐIỀU TRỊ ${props?.data?.template?.data?.serviceName}`}
                                        </Text>
                                        <Text style={[styles.descriptionShare]}>
                                            {`Thời gian: ${moment(props?.data?.template?.data?.dateTime).format('DD-MM-YYYY')}`}
                                        </Text>
                                        <Text style={[styles.descriptionShare]}>
                                            {`Điều trị tại ${props?.data?.template?.data?.branchName}`}
                                        </Text>
                                    </View>
                                </View>
                                :<></>
                            }
                        </TouchableOpacity>

                    </View>
                    {/* end feed content */}
                    <ActionFeed data={props?.data}/>
                    {/* end Tool */}
                    <ListComment data={props?.data?.comments}/> 

                </TouchableOpacity>
                    {/* enditemFeed */} 
        </>
    )
}


const styles = StyleSheet.create({

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
        fontSize: _moderateScale(13)
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
   

    ///-----end feed-----///

   
})


export default ItemFeed
