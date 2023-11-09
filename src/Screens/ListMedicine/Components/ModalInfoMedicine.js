import { isEmpty } from 'lodash-es';
import moment from 'moment';
import React, { memo, useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { BASE_COLOR, BG_GREY_OPACITY_9, BG_SERVICE, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale } from '../../../Constant/Scale';
import ItemSection from './ItemSection';


const ModalInfoMedicine = memo((props) => {

    useEffect(() => {
   
    }, [props?.data])

    return (
        <Modal style={{
            margin: 0,
            marginVertical: _moderateScale(32),
            alignItems: "center",
            justifyContent: 'center',
            marginHorizontal: _moderateScale(8 * 4)
        }}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={150}
            animationOutTiming={500}
            isVisible={props.show}
            backdropTransitionOutTiming={0}
            useNativeDriverForBackdrop={true}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? true : true}
            onBackButtonPress={() => {
                props.hide()
            }}
            onBackdropPress={() => {
                props.hide()
            }}>
            <View style={[styles.container]}>
            <ScrollView showsVerticalScrollIndicator={false}>
               
                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: "#EC3A79", alignSelf: 'center' }]}>
                    CHI TIẾT 
                </Text>

                <View style={{flexDirection:'row', 
                        justifyContent:'space-between'}}>
                    <Text style={[styles.titTle]}>{props?.data?.name}</Text>
                    <Text style={[stylesFont.fontNolanBold,{fontSize:_moderateScale(14), color: SECOND_COLOR }]}>
                    {moment(props?.data?.date).format('DD-MM-YYYY')}
                    </Text>
                </View>
                <View style={[styles.description]}>
                {isEmpty(props?.data?.details)?
                <Text >Không có đơn thuốc trong hôm nay</Text>
                :
                    <Text>{props?.data?.description}</Text>}
                </View>
                
                {!isEmpty(props?.data?.details)&&<Text style={[styles.titTle]}>Chỉ định</Text> }

                 <View style={[styles.listMedicine]}>
                    {
                         props?.data?.details?.map((res, i) => {
                            return <>
                                    <ItemSection data={res} key={i} />
                                </>
    
                        })
                    }
                </View>
                    
                </ScrollView>
                <TouchableOpacity
                style={{backgroundColor:BASE_COLOR, 
                    marginBottom:_moderateScale(8),
                    borderRadius: _moderateScale(4),
                    paddingVertical:_moderateScale(4), paddingHorizontal: _moderateScale(8)}}
                onPress={()=>props.hide()}>
                    <Text style={[{ fontSize: _moderateScale(16), color:WHITE, alignSelf: 'center' }]}>
                       ĐÓNG
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
});


const styles = StyleSheet.create({
    btnService: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_SERVICE,
        marginRight: _moderateScale(8),
        marginTop: _moderateScale(8)
    },
    btnConfirm__text: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    btnConfirm: {
        width: "45%",
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        height: _moderateScale(8 * 4)
    },
    container: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingTop: _moderateScale(20),
        // paddingBottom: _moderateScale(50),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(23),
        borderRadius: _moderateScale(8)
    },
    titTle:{
        ...stylesFont.fontNolanBold
    },
    description:{
        padding: _moderateScale(4),
        marginLeft: _moderateScale(8),
        paddingLeft: _moderateScale(8),
        marginVertical: _moderateScale(8),
        borderColor: WHITE,
        borderLeftColor: SECOND_COLOR,
        borderWidth: _moderateScale(2)
    },
    quote:{
        height:_moderateScale(16),
        width:_moderateScale(2),
        backgroundColor: SECOND_COLOR,
        
    },
    listMedicine:
    {
        marginVertical: _moderateScale(12)
    },
    lineMedical:{
        flexDirection:'row',
        justifyContent: 'space-between',
        borderBottomWidth: _moderateScale(0.5),
        paddingBottom: _moderateScale(8),
        marginTop: _moderateScale(8),
        borderBottomColor: BG_GREY_OPACITY_9
    }
})

export default ModalInfoMedicine;