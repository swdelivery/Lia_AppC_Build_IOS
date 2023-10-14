import { StyleSheet } from 'react-native'
import { _moderateScale, _height, _heightScale } from './Scale'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import * as Color from '../Constant/Color'

export const styleElement = StyleSheet.create({
    hitslopSm:{
        top:12, left:12, right:12, bottom:12
    },
    hitslopMd:{
        top:20, left:20, right:20, bottom:20
    },
    lineHorizontal:{
        width:"100%",
        height:_moderateScale(0.75),
        backgroundColor:Color.BG_GREY_OPACITY_2
    },
    title__h1: {
        fontSize: _moderateScale(20),
        color: Color.GREY_FOR_TITLE
    },
    title__h2: {
        fontSize: _moderateScale(18),
        color: Color.GREY_FOR_TITLE
    },
    title__h3: {
        fontSize: _moderateScale(16),
        color: Color.GREY_FOR_TITLE
    },
    modalBoxContainer: {
        height: Platform.OS == "ios" ? (_height - _heightScale(getStatusBarHeight() + 8)) : (_height - _heightScale(getStatusBarHeight())),
    },
    row:{
        flexDirection:'row'
    },
    rowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rowAliCenterWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    rowAliBottom: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    rowAliTop: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    rowAliCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paddingBtn: {
        padding: _moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerChild:{
        alignItems:'center',
        justifyContent:'center'
    },

    colAliBottom: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    colAliTop: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
})
