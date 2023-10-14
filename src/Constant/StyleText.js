import { StyleSheet } from "react-native";
import { _moderateScale } from "./Scale";

export const styleText = StyleSheet.create({
    // l:{
    //     width:_moderateScale(8*12),
    //     height:_moderateScale(8*6),
    // },
    // xl:{
    //     width:_moderateScale(8*14),
    //     height:_moderateScale(8*8),
    //     resizeMode:'contain'
    // },
    // xxl:{
    //     width:_moderateScale(8*16),
    //     height:_moderateScale(8*8),
    //     resizeMode:'contain'
    // }
    textBlackSmall500:{
        fontSize:_moderateScale(12),
        fontWeight:'500',
        color:'black'
    },
    textBlackNorBold:{
        fontSize:_moderateScale(14),
        fontWeight:'bold',
        color:'black'
    },
    textWhiteNor500:{
        fontSize:_moderateScale(14),
        fontWeight:'500',
        color:'white'
    },
    textWhiteSmall500:{
        fontSize:_moderateScale(12),
        fontWeight:'500',
        color:'white'
    },
})