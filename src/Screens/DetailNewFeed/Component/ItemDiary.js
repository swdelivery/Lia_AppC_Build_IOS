import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BASE_COLOR, BG_GREY_OPACITY_5, BLACK_OPACITY, BLACK_OPACITY_8, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { sizeIcon } from '../../../Constant/Icon';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { useDispatch, useSelector } from 'react-redux';
import { getTreatmentDiaryById } from '../../../Redux/Action/Diary';
import ImageView from "react-native-image-viewing";
import { getPartnerDiaryDailyById } from '../../../Redux/Action/PartnerDiary';
import moment from 'moment';


const ItemDiary = memo((props) => {
    const dispatch = useDispatch()

    const currentPostRedux = useSelector(state => state?.postReducer?.currentPost)
    const [currentTreatment, setCurrentTreatment] = useState(null)
    const [currentDay, setCurrentDay] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    const currentTreatmentDiaryRedux = useSelector(state => state?.partnerDiaryReducer?.listPartnerDiaryDaily)

    console.log({currentPostRedux})
    useEffect(() => {
        if(currentPostRedux?.template?.data?.partnerDiaryId)
        {
            dispatch(getPartnerDiaryDailyById(currentPostRedux?.template?.data?.partnerDiaryId))
        }
    }, [])


    return (
        <>
        <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />
            <View style={[styles.treatment]}>
                        <View style={[styles.headTreatment]}>
                                <Text style={[styles.titTreatment]}>
                                    Điều trị
                                </Text>
                        </View>
                        <View style={[styles.imageRow]}>
                                <View style={[styles.itemImgRow]}>
                                     <Text style={[styles.titImgRow]}>Trước</Text>
                                     <View style={[styles.multiImg]}>
                                         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                          {currentPostRedux?.template?.data?.imageBeforeTreatment?.map((item, index)=>{
                                              return  currentPostRedux?.hiddenIdArr?.indexOf(item._id)<0?
                                              <TouchableOpacity
                                              key={index}
                                                onPress={() => {
                                                    setShowImageViewing(true)
                                                    setIndexCurrImageView(index)
                                                    setListImagesSeeCurr(currentPostRedux?.template?.data?.imageBeforeTreatment)
                                                }}
                                              style={[styles.imgWrapper]}>
                                                    <Image 
                                                        key={index}
                                                        style={[styles.imgDetail]}
                                                        source={{
                                                            uri: `${URL_ORIGINAL}${item?.link}`
                                                        }} /> 
                                                </TouchableOpacity>
                                                :
                                                 <View 
                                                 key={index}
                                                 style={[styles.imgWrapper]}>
                                                 <Image 
                                                     style={[styles.imgDetail]}
                                                     source={require('../../../Image/component/logoLinear.png')} /> 
                                                 <TouchableOpacity style={[styles.overHiddenImg]}>
                                                     <Image 
                                                        style={[sizeIcon.xs]}
                                                        source={require('../../../Image/component/hidden.png')} /> 
                                                 </TouchableOpacity>
                                              </View>
                                                
                                          })
                                        }   
                                         </ScrollView>
                                     </View>
                                </View>
                                <View style={[styles.itemImgRow]}>
                                     <Text style={[styles.titImgRow]}>Sau</Text>
                                     <View style={[styles.multiImg]}>
                                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                     {currentPostRedux?.template?.data?.imageAfterTreatment?.map((item, index)=>{
                                              return currentPostRedux?.hiddenIdArr?.indexOf(item._id)<0?
                                              <TouchableOpacity
                                              key={index}
                                                onPress={() => {
                                                    setShowImageViewing(true)
                                                    setIndexCurrImageView(index)
                                                    setListImagesSeeCurr(currentPostRedux?.template?.data?.imageAfterTreatment)
                                                }} style={[styles.imgWrapper]}>
                                                    <Image 
                                                        key={index}
                                                        style={[styles.imgDetail]}
                                                        source={{
                                                            uri: `${URL_ORIGINAL}${item?.link}`
                                                        }} /> 
                                                </TouchableOpacity>
                                                :
                                                 <View 
                                                 key={index}
                                                 style={[styles.imgWrapper]}>
                                                 <Image 
                                                     style={[styles.imgDetail]}
                                                     source={require('../../../Image/component/logoLinear.png')} /> 
                                                 <TouchableOpacity style={[styles.overHiddenImg]}>
                                                     <Image 
                                                        style={[sizeIcon.xs]}
                                                        source={require('../../../Image/component/hidden.png')} /> 
                                                 </TouchableOpacity>
                                              </View>
                                                
                                          })
                                        }   
                                         </ScrollView>
                                     </View>
                                </View>
                        </View>
            </View>
            <View style={[styles.treatment]}>
                        <View style={[styles.headTreatment]}>
                                <Text style={[styles.titTreatment]}>
                                    Hậu phẫu
                                </Text>
                                <View style={[styles.timeLine]}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {currentTreatmentDiaryRedux?.map((day, index) => {
                                        return day?.isActive===true&&
                                        <TouchableOpacity
                                            key={index}
                                                onPress={() => setCurrentDay(index)}
                                            >
                                                <Text style={[styles.textTime,
                                                currentDay === index && styles.textTimeActive
                                                ]}>{moment(day?.date).format('DD-MM-YYYY')}</Text>
                                            </TouchableOpacity>
                                        })}
                                    </ScrollView>
                                </View>
                        </View>
                        <View style={{flex:1}}>
                            <View style={[styles.imageRow]}>
                                    <View style={[styles.multiImg]}>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {currentTreatmentDiaryRedux?.length>0&&
                                        currentTreatmentDiaryRedux[currentDay]?.images?.map((img, index) => {
                                                return currentPostRedux?.hiddenIdArr.indexOf(img?._id) <0 ?
                                                <TouchableOpacity
                                                key={index}
                                                    onPress={() => {
                                                        setShowImageViewing(true)
                                                        setIndexCurrImageView(index)
                                                        setListImagesSeeCurr(currentTreatmentDiaryRedux[currentDay]?.images)
                                                    }}
                                                    style={[styles.imgWrapper]} key={index}>
                                                    <Image
                                                        style={[styles.imgDetail]}
                                                        source={{ uri: `${URL_ORIGINAL}${img?.link}` }} />
                                                </TouchableOpacity>:
                                                <View
                                                // onPress={() => _handleHiddenImage(img?.image?.id)}
                                                style={[styles.imgWrapper]} key={index}>
                                                   <Image 
                                                     style={[styles.imgDetail]}
                                                     source={require('../../../Image/component/logoLinear.png')} /> 
                                                        <TouchableOpacity
                                                        // onPress={() => _handleHiddenImage(img?.image?.id)}
                                                        style={[styles.overHiddenImg]}>
                                                        <Image
                                                            style={[sizeIcon.xs]}
                                                            source={require('../../../Image/component/hidden.png')} />
                                                    </TouchableOpacity> 
                                                </View>
                                            })}
                                        </ScrollView>
                                    </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: _moderateScale(12)}}>
                                <Text style={{fontSize: _moderateScale(14), ...stylesFont.fontNolanBold}}>
                                Cảm nghĩ:
                                </Text>
                                <Text style={{fontSize: _moderateScale(13), flex:1, ...stylesFont.fontNolan, 
                                    paddingLeft:_moderateScale(4),
                                    color: BLACK_OPACITY}}>
                                    {currentTreatmentDiaryRedux?.length>0&&currentTreatmentDiaryRedux[currentDay]?.description}
                                </Text>
                            </View>
                        </View>
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    treatment:{
        flex:1,
        backgroundColor: WHITE,
        // marginTop: _moderateScale(6),
        paddingHorizontal: _moderateScale(14),
        paddingVertical: _moderateScale(6),
        // borderRadius: _moderateScale(8),
    },
    headTreatment:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingHorizontal:_moderateScale(2)
    },
    titTreatment:{
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        fontWeight: 'bold',
        ...stylesFont.fontNolanBold
    },
    imageRow:{
        flexDirection: 'row',
        marginTop: _moderateScale(4),
        justifyContent:'space-between'
    },
    titImgRow:{
        color: SECOND_COLOR,
        fontSize: _moderateScale(12),
        marginBottom: _moderateScale(4)
    },
    itemImgRow:{
        flex: 0.49,
    },
    multiImg:{
        flexDirection: 'row',
        flex:1
    },
    imgWrapper:{
        width:_widthScale(64),
        height: _heightScale(64),
        justifyContent:'center',
        alignItems:'center',
        // borderWidth: _moderateScale(0.5),
        // borderColor: BG_GREY_OPACITY_5,
        marginRight: _moderateScale(6),
        position: 'relative',
    },
    imgDetail:{
        width: _widthScale(64),
        height: _heightScale(64),
        borderRadius: _moderateScale(4)
    },
    overHiddenImg:{
        position:'absolute',
        backgroundColor: MAIN_OPACITY_8,
        top:0,
        left:0,
        right:0,
        bottom:0,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    timeLine:{
        flexDirection: 'row',
        paddingLeft: _moderateScale(8*4),
        alignSelf:'flex-end',
        flex:1,
    },
    textTime:{
        color: GREY,
        fontSize: _moderateScale(12),
        marginHorizontal: _moderateScale(8)
    },
    textTimeActive: {
        color: SECOND_COLOR
    },
    imgHorizontal:{
        marginRight: _moderateScale(4)
    }
})

export default ItemDiary;