import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BASE_COLOR, BG_MAIN_OPACITY, BLACK_OPACITY_8, BLUE_FB, BTN_PRICE, GREY, GREY_FOR_TITLE, SECOND_COLOR, THIRD_COLOR, WHITE } from '../../../Constant/Color';

import ItemQA from './Components/ItemQA'
import { getQuestionAnswer } from '../../../Redux/Action/InfoAction';
import { sizeIcon } from '../../../Constant/Icon';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import { isEmpty } from 'lodash-es';
import { styleTo, styleToComponent } from '../../../Constant/styleTo';
import RenderHtml from 'react-native-render-html';
import { getGuideCollaborator } from '../../../Redux/Action/Affiilate';
import { getConfigData } from '../../../Redux/Action/OrtherAction';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';

const index = (props) => {
    // const [listQA, setListQA] = useState([])
    const [data, setData] = useState({
        "treatmentDetail": {
            "isComplete": true
        },
        "treatmentDiary": {
            "isComplete": false
        },
        "partnerPost": {
            "isComplete": false
        }
    })

    const [detail, setDetail] = useState({})
    const [step, setStep] = useState('treatmentDetail')


    useEffect(() => {
        _getGuide()
        handleDetail('treatmentDetail','COLLAB_STEP_1')
    }, [])

   
    const _getGuide = async () => {
        let result = await getGuideCollaborator()
        if (result?.isAxiosError) return
         setData(result)
    }

    const handleDetail = (type, code) =>{
        _getGuideDescription(code, type)
        setStep(type)
    }

    const _getGuideDescription = async (code, type) => {
        let result = await getConfigData(code)
        if (result?.isAxiosError) return
        setDetail(result.value)
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: _moderateScale(8*2) }}>
            <View style={{ marginTop: _moderateScale(8 * 1) }}>
                <Text style={{fontSize: _moderateScale(14), color: GREY_FOR_TITLE}}>
                    Hãy hoàn tất các bước dưới đây để trở thành Cộng tác viên nhé!
                </Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop: _moderateScale(12)}}>
                <TouchableOpacity 
                onPress={()=>handleDetail('treatmentDetail','COLLAB_STEP_1')}
                style={[styles.itemStep, data?.treatmentDetail?.isComplete === true && styles.stepActive]}>
                    <View style={[styles.imageDisable, data?.treatmentDetail?.isComplete === true &&  styles.imageAvailable]}>
                        {
                            data?.treatmentDetail?.isComplete === true ?
                            <Image
                            style={{ width: _moderateScale(8 * 2), height: _moderateScale(8 * 2), 
                                borderRadius: _moderateScale(6) }}
                            resizeMode="cover"
                            source={require('../../../NewIcon/aff_check.png')} />
                            :
                            <Image
                            style={{ width: _moderateScale(8 * 2), height: _moderateScale(8 * 2), 
                                borderRadius: _moderateScale(6) }}
                            resizeMode="cover"
                            source={require('../../../NewIcon/aff_heart.png')} />
                        }
                       
                    </View>
                    <Text style={[styles.textVisible, data?.treatmentDetail?.isComplete === true && styles.textActive]}>Sử dụng{`\n`}dịch vụ</Text>
                </TouchableOpacity>  
                <TouchableOpacity 
                onPress={()=>handleDetail('treatmentDiary','COLLAB_STEP_2')}
                style={[styles.itemStep, data?.treatmentDiary?.isComplete === true && styles.stepActive]}>
                    <View style={[styles.imageDisable,data?.treatmentDiary?.isComplete === true &&  styles.imageAvailable]}>
                    {
                            data?.treatmentDiary?.isComplete === true ?
                            <Image
                            style={{ width: _moderateScale(8 * 2), height: _moderateScale(8 * 2)}}
                            resizeMode="cover"
                            source={require('../../../NewIcon/aff_check.png')} />
                            :
                            <Image
                            style={{ width: _moderateScale(8 * 2), height: _moderateScale(8 * 2)}}
                            resizeMode="cover"
                            source={require('../../../NewIcon/aff_diary.png')} />
                        }
                    </View>
                    <Text style={[styles.textVisible, data?.treatmentDiary?.isComplete === true && styles.textActive]}>Hoàn thành{`\n`}nhật ký</Text>
                </TouchableOpacity>       
                <TouchableOpacity 
                onPress={()=>handleDetail('partnerPost','COLLAB_STEP_3')}
                style={[styles.itemStep, data?.partnerPost?.isComplete === true && styles.stepActive]}>
                    <View style={[styles.imageDisable,data?.partnerPost?.isComplete === true &&  styles.imageAvailable]}>
                        {
                            data?.partnerPost?.isComplete === true ?
                            <Image
                            style={{ width: _moderateScale(8 * 2), height: _moderateScale(8 * 2) }}
                            resizeMode="cover"
                            source={require('../../../NewIcon/aff_check.png')} />
                            :
                            <Image
                            style={{ width: _moderateScale(8 * 2), height: _moderateScale(8 * 2) }}
                            resizeMode="cover"
                            source={require('../../../NewIcon/aff_share.png')} />
                        }
                    </View>
                    <Text style={[styles.textVisible, data?.partnerPost?.isComplete === true && styles.textActive]}>Chia sẻ{`\n`}nhật ký</Text>
                </TouchableOpacity>   
            </View>

            <View style={[styles.content, data[step]?.isComplete === true && styles.bgActive]}>
                    <Text style={{...stylesFont.fontNolanBold, 
                        color:  data[step]?.isComplete === true ?BASE_COLOR: BLACK_OPACITY_8,
                        marginBottom: _moderateScale(12)}}>
                    {step === 'treatmentDetail'&&`I. Sử dụng dịch vụ`}
                    {step === 'treatmentDiary'&&`II. Hoàn thành nhật ký`}
                    {step === 'partnerPost'&&`III. Chia sẻ nhật lý`}
                </Text>
                <RenderHtml
                        contentWidth={_width - _widthScale(8 * 6)}
                        source={{ html: detail }}
                        enableExperimentalBRCollapsing={true}
                        enableExperimentalMarginCollapsing={true}
                    />

                {step==='treatmentDetail'&&data[step]?.isComplete !== true?
                <TouchableOpacity 
                onPress={()=>navigation.navigate(ScreenKey.CREATE_BOOKING)}
                style={{backgroundColor: BASE_COLOR, 
                alignSelf: 'center',
                marginTop: _moderateScale(12),
                borderRadius: _moderateScale(4),
                paddingHorizontal: _moderateScale(12), 
                paddingVertical:_moderateScale(4)}}>
                    <Text style={{fontSize:_moderateScale(14), color: WHITE}}>
                        Đặt hẹn điều trị
                    </Text>
                </TouchableOpacity>:<></>
                }
                {step==='treatmentDiary'&&data[step]?.isComplete !== true?
                <TouchableOpacity 
                onPress={()=>navigation.navigate(ScreenKey.LIST_ALL_HISTORY_TREATMENT)}
                style={{backgroundColor: BASE_COLOR, 
                alignSelf: 'center',
                marginTop: _moderateScale(12),
                borderRadius: _moderateScale(4),
                paddingHorizontal: _moderateScale(12), 
                paddingVertical:_moderateScale(4)}}>
                    <Text style={{fontSize:_moderateScale(14), color: WHITE}}>
                        Hoàn thành nhật ký  
                    </Text>
                </TouchableOpacity>:<></>
                }

            {step==='partnerPost'&&data[step]?.isComplete !== true?
                <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate(ScreenKey.TAB_TIMELINE)
                    navigation.navigate(ScreenKey.CREATE_NEW_FEED)
                }}
                style={{backgroundColor: BASE_COLOR, 
                alignSelf: 'center',
                marginTop: _moderateScale(12),
                borderRadius: _moderateScale(4),
                paddingHorizontal: _moderateScale(12), 
                paddingVertical:_moderateScale(4)}}>
                    <Text style={{fontSize:_moderateScale(14), color: WHITE}}>
                       Chia sẻ nhật ký
                    </Text>
                </TouchableOpacity>:<></>
                }
                
                
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textVisible:{
        color: GREY,
        textAlign: 'center',
        ...stylesFont.fontNolan500
    },
    textActive:{
        color: BASE_COLOR,
        ...stylesFont.fontNolan500
    },
    itemStep:{
        paddingHorizontal: _moderateScale(4),
        minWidth: _moderateScale(90),
        display: 'flex',
        alignItems:'center'
    },
    imageDisable:{
        marginVertical: _moderateScale(8),
        backgroundColor: GREY, 
        padding: _moderateScale(6), 
                        borderRadius: _moderateScale(32)
    },
    imageAvailable:{
        backgroundColor: SECOND_COLOR
    },
    content:{
        minHeight: _moderateScale(240),
        backgroundColor: '#F9F9F9',
        marginTop: _moderateScale(16),
        borderRadius: _moderateScale(10),
        paddingVertical: _moderateScale(6),
        paddingHorizontal: _moderateScale(8)
    },
    bgActive: {
        backgroundColor: BG_MAIN_OPACITY
    }

})






export default index;