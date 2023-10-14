import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image ,ScrollView} from 'react-native';
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

const ItemBooking = memo((props) => {
    const dispatch = useDispatch()


    const currentTreatmentDiaryRedux = useSelector(state => state?.diaryReducer?.currentTreatmentDiary)
    const [data, setData] = useState(null)


    const _handleChoosenDiary  = () => {
        dispatch({
            type:'SET_CURRENT_TREATMENT_DIARY',
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

 

    const _handleChooseDate = (type,value) =>{
        if(type==='all')
        {
            let date = _map(data?.dailyDiaryArr,'id')
            setData(old=>{
                return {
                    ...old, 
                    sharedDiaryIdArr:date
                }
            })
        }
        else
        {
            var index = data?.sharedDiaryIdArr?.indexOf(value)
            if(index>-1)
            {
                setData(old=>{
                    return {
                        ...old, 
                        sharedDiaryIdArr: [...old.sharedDiaryIdArr].filter(item=> item!==value)
                    }
                })
            }
            else
            {
                setData(old=>{
                    return {
                        ...old, 
                        sharedDiaryIdArr: [...old.sharedDiaryIdArr, value]
                    }   
                })
            }
        }
    }

    var hasChoose = _get(currentTreatmentDiaryRedux,'id',''!=='')
    var isChoose = currentTreatmentDiaryRedux?.id===data?.id

    const _handleGoback = () =>{
        dispatch({
            type:'UPDATE_CURRENT_TREATMENT_DIARY',
            payload: data
        })
        navigation.goBack()
    }
    return (
            <TouchableOpacity 
            onPress={_handleChoosenDiary}
            style={[styles.itemDiary,
                hasChoose?(isChoose?styles.hasChoosen:styles.hasNotChoosen):{}
                ]}>
                    
                    <TouchableOpacity>
                    <Text style={[styles.titDiary,
                    hasChoose?(isChoose?styles.hasChoosen:styles.textHasNotChoosen):{}
                    ]}>Nhật ký điều trị - {data?.serviceName}</Text></TouchableOpacity>
                    <Text style={[styles.time,
                    hasChoose?(isChoose?styles.hasChoosen:styles.textHasNotChoosen):{}]}>{moment(data?.startDate).format('DD-MM-YYYY')}</Text>
                    <Text style={[styles.brief,{marginTop: _moderateScale(8)},
                    hasChoose?(isChoose?styles.hasChoosen:styles.textHasNotChoosen):{}]}>Ngày nhật ký {isChoose?`(Chọn ngày bạn muốn chia sẻ)`:``}: </Text>
                    <View style={[styles.listDate]}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                data?.dailyDiaryArr?.length>0&&
                                <TouchableOpacity 
                                onPress={()=>_handleChooseDate('all')}
                                style={[styles.date, 
                                    isChoose&&data?.sharedDiaryIdArr.length === data?.dailyDiaryArr?.length&&styles.dateActive]}>
                                    <Text style={[styles.txtDate, 
                                        isChoose&&data?.sharedDiaryIdArr.length === data?.dailyDiaryArr?.length&&styles.txtDateActive]}>
                                            Tất cả</Text>
                                </TouchableOpacity>
                            }
                            {
                                data?.dailyDiaryArr?.map((item,index)=>{
                                    var exist = data?.sharedDiaryIdArr.indexOf(item?.id)
                                    return <TouchableOpacity 
                                            onPress={()=>_handleChooseDate('single',item?.id)}
                                            style={[styles.date,
                                                isChoose&&(exist>-1&&styles.dateActive)]} key={index}>
                                                <Text style={[styles.txtDate, 
                                                    isChoose&&(exist>-1&&styles.txtDateActive)]}>Ngày {item?.index}</Text>
                                            </TouchableOpacity>
                                })
                            }
                        </ScrollView>
                    </View>
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
        fontSize: _moderateScale(20),
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