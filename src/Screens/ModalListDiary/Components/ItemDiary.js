import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image,ScrollView } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, SECOND_COLOR, BLUE_FB, BLUE_2, BG_GREY_OPACITY_7, BASE_COLOR, BG_GREY_OPACITY_9, BG_GREY_OPACITY_3 } from '../../../Constant/Color';
import { _moderateScale } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import {  URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector, useDispatch } from 'react-redux';
import ModalPaymentRequest from '../../Conversation/ListNoti/Components/ModalPaymentRequest'
import { formatMonney } from '../../../Constant/Utils';
import _map from 'lodash/map'
import _get from 'lodash/get'
import { navigation } from '../../../../rootNavigation';
import { isEmpty } from 'lodash-es';

const ItemBooking = memo((props) => {
    const dispatch = useDispatch()


    const currentTreatmentDiaryRedux = useSelector(state => state?.partnerDiaryReducer?.currentPartnerDiary)
    const [data, setData] = useState(null)

    const _handleChoosenDiary  = () => {
        dispatch({
            type:'SET_CURRENT_PARTNER_DIARY',
            payload: data
        })
    }

    useEffect(() => {
       if(props?.data)
       {
            setData(props?.data)
       }
    }, [props?.data])

    useEffect(() => {
        if(_get(currentTreatmentDiaryRedux,'id','')===props?.data?.id)
        {
             setData(currentTreatmentDiaryRedux)
        }
     }, [currentTreatmentDiaryRedux])


    var isChoose = currentTreatmentDiaryRedux?.id===data?.id && !isEmpty(currentTreatmentDiaryRedux)
    var listImage = []
    data?.dailyDiaryArr.map(item=>{
        if(listImage.length<6)
        {
            listImage = [...item.images, ...listImage]
        }
        return
    })

    const _handleGoback = () =>{
        dispatch({
            type:'UPDATE_LIST_PARTNER_DIARY',
            payload: data
        })
        navigation.goBack()
    }


    return (
            <TouchableOpacity 
            onPress={_handleChoosenDiary}
            style={[styles.itemDiary,
                isChoose?styles.hasChoosen:styles.hasNotChoosen
                ]}>
                    
                    <View>
                    <Text style={[styles.titDiary,
                    isChoose?styles.hasChoosen:styles.textHasNotChoosen
                    ]}>Nhật ký điều trị - {data?.serviceName}</Text></View>
                    <Text style={[styles.time,
                    isChoose?styles.hasChoosen:styles.textHasNotChoosen]}>{moment(data?.startDate).format('DD-MM-YYYY')}</Text>
                   {
                    listImage.length>0?
                    <View style={[styles.listDate]}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                           {listImage.map((item, ind)=>{
                               return <Image source={{
                                   uri: `${URL_ORIGINAL}${item?.link}`
                               }} 
                               key={ind}
                               style={{
                                   borderRadius: _moderateScale(6),
                                marginHorizontal: _moderateScale(4),   
                                height:_moderateScale(72), width:_moderateScale(72)}}
                               />
                           })}
                        </ScrollView>
                    </View>
                    :<></>       
                    }
                    
                    {isChoose? //&&data?.sharedDiaryIdArr.length>0
                    <TouchableOpacity
                        onPress={()=>_handleGoback()}
                        style={[styles.btnAction]}
                        >
                        <Text style={{color:WHITE}}>Chia sẻ</Text>
                    </TouchableOpacity>:<></>}
                </TouchableOpacity>


    );
});

const styles = StyleSheet.create({
    itemDiary:{
        backgroundColor: WHITE,
        marginBottom: _moderateScale(8),
        marginTop: _moderateScale(8),
        padding: _moderateScale(12),
        borderRadius: _moderateScale(4),
        paddingBottom: _moderateScale(16),
        position:'relative'
    },
    titDiary:{
        fontSize: _moderateScale(18),
        ...stylesFont.fontNolanBold,
        color: SECOND_COLOR
    },
    time:{
        fontSize: _moderateScale(12),
        color: BLUE_FB,
        marginTop: _moderateScale(2)
    },
    brief:{
        fontSize: _moderateScale(12),
        fontStyle: 'italic',
        color: BLACK_OPACITY_8,
        marginTop: _moderateScale(2)
    },
    listDate: {
        flex:1,
        marginTop: _moderateScale(6)
    },
    date:{
        backgroundColor: BG_GREY_OPACITY_5,
        marginRight: _moderateScale(12),
        padding: _moderateScale(6),
        paddingHorizontal:_moderateScale(12),
        borderRadius: _moderateScale(4)
    },
    dateActive:{
        backgroundColor: BASE_COLOR
    },
    txtDate:{
        fontSize: _moderateScale(13),
        color: GREY,
    },
    txtDateActive:{
        fontSize: _moderateScale(13),
        color: WHITE,
    },
    hasNotChoosen:{
        backgroundColor: BG_GREY_OPACITY_3
    },
    textHasNotChoosen:{
        color: GREY
    },
    hasChoosen:{
        backgroundColor: WHITE
    },
    btnAction:{
        backgroundColor: BLUE_FB,
       width:_moderateScale(80),
       paddingVertical: _moderateScale(4),
       alignItems:'center',
       borderRadius: _moderateScale(4),
       marginTop: _moderateScale(12),
       alignSelf:'flex-end'
    }
})

export default ItemBooking;