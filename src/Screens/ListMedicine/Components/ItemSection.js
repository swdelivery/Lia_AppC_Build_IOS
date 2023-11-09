import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, BASE_COLOR, BLUE_FB } from '../../../Constant/Color';
import { _moderateScale } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';

const ItemSection = (props) => {

    let times = Math.floor(props?.data.timeInDay/60)
    let timess = Math.floor(props?.data.timeInDay%60)
    return (
        <>
           <View style={[styleElement.lineHorizontal, { marginTop: _moderateScale(8) }]} />
                    <View style={styles.itemTime}>
                            <View style={styles.topTime}>
                                <View style={styles.leftTopTime}>
                                    <Text style={{fontWeight: '500', color: BLUE_FB}}>{props?.data.name}</Text>
                                    <Text style={{paddingLeft: _moderateScale(8), 
                                        fontSize: _moderateScale(12), 
                                        marginBottom: _moderateScale(4),
                                        fontStyle:'italic', color: GREY_FOR_TITLE}}>{props?.data.description}</Text>
                                </View>
                                <Text style={{color: BASE_COLOR}}>{times}:
                                {`${timess<10?`0${timess}`:timess}`}
                                </Text>
                            </View>
                            <View style={styles.detailTime}>
                                {props?.data?.listMedicine?.map((md,index)=>{
                                    return <View style={styles.lineMedicine} key={index}>
                                        <Text style={{color:GREY_FOR_TITLE}}>
                                                {md?.medicine?.name}
                                        </Text>
                                        <Text>
                                                {`${md?.amountInDose} (${md?.unit})`}
                                        </Text>
                                    </View>
                                })}
                            </View>
                        </View> 
        </>
    );
};


const styles = StyleSheet.create({

    itemTime:{
        marginVertical: _moderateScale(6),
    },
    topTime:{
        flexDirection: 'row'
    },
    leftTopTime:{
        flex: 1
    },
    detailTime:{
        marginTop: _moderateScale(4)
    },
    lineMedicine:{
        flexDirection: 'row',
        marginBottom: _moderateScale(2),
        justifyContent:'space-between',
        // borderBottomWidth: _moderateScale(0.3),
        paddingVertical: _moderateScale(4),
        borderColor: '#f1f2f3'
    }
})


export default ItemSection;