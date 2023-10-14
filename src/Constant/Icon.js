import {
    Platform,
    StyleSheet
} from 'react-native'
import { _widthScale, _heightScale, _moderateScale } from '../Constant/Scale'

export const sizeLogo = StyleSheet.create({
    l:{
        width:_moderateScale(8*12),
        height:_moderateScale(8*6),
        resizeMode:'contain'
    },
    xl:{
        width:_moderateScale(8*14),
        height:_moderateScale(8*8),
        resizeMode:'contain'
    },
    xxl:{
        width:_moderateScale(8*16),
        height:_moderateScale(8*8),
        resizeMode:'contain'
    }
})

export const sizeIcon = StyleSheet.create({
    xxxxs:{
        width: _moderateScale(10),
        height: _moderateScale(10),
        resizeMode: 'contain'
    },
    xxxs:{
        width: _moderateScale(12),
        height: _moderateScale(12),
        resizeMode: 'contain'
    },
    xxs: {
        width: _moderateScale(14),
        height: _moderateScale(14),
        resizeMode: 'contain'
    },
    xs: {
        width: _moderateScale(16),
        height: _moderateScale(16),
        resizeMode: 'contain'
    },
    sm: {
        width: _moderateScale(18),
        height: _moderateScale(18),
        resizeMode: 'contain'
    },
    md: {
        width: _moderateScale(20),
        height: _moderateScale(20),
        resizeMode: 'contain'
    },
    lg: {
        width: _moderateScale(22),
        height: _moderateScale(22),
        resizeMode: 'contain'
    },
    llg:{
        width: _moderateScale(26),
        height: _moderateScale(26),
        resizeMode: 'contain'
    },
    lxlg:{
        width: _moderateScale(28),
        height: _moderateScale(28),
        resizeMode: 'contain',
    },
    lllg:{
        width: _moderateScale(30),
        height: _moderateScale(30),
        resizeMode: 'contain'
    },
    llllg:{
        width: _moderateScale(34),
        height: _moderateScale(34),
        resizeMode: 'contain'
    },
    xlllg:{
        width: _moderateScale(36),
        height: _moderateScale(36),
        resizeMode: 'contain'
    },
    xxlllg:{
        width: _moderateScale(40),
        height: _moderateScale(40),
        resizeMode: 'contain'
    },
    xxxlllg:{
        width: _moderateScale(64),
        height: _moderateScale(64),
        resizeMode: 'contain'
    },
    flagLevel:{
        width: _moderateScale(48),
        height: _moderateScale(48),
        resizeMode: 'contain'
    }
})