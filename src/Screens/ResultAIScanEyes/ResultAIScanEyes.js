import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale'
import LinearGradient from 'react-native-linear-gradient'
import LeftEye from './Components/LeftEye'
import RightEye from './Components/RightEye'
import { GREY_FOR_TITLE } from '../../Constant/Color'
import RecomendService from './Components/RecomendService'
import RecomendDoctor from './Components/RecomendDoctor'
import RecomendBrach from './Components/RecomendBrach'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Header from './Components/Header'

const ResultAIScanEyes = () => {
    return (
        <View style={styles.container}>

            <View style={styles.blankHeader} />
            <Header/>

            <ScrollView>
                <View style={styles.overView}>
                    <LinearGradient
                        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#B9DDF5', '#74BAEB', "#74BAEB"]}
                    />

                    <View style={styles.overView__box}>

                        <LeftEye />


                    </View>
                    <View style={[styles.overView__box, { marginTop: _moderateScale(8 * 2) }]}>
                        <RightEye />
                    </View>

                </View>
                <RecomendService />
                <View style={{ height: _heightScale(4) }} />
                <RecomendDoctor />
                <View style={{ height: _heightScale(4) }} />
                <RecomendBrach />

                <View style={{ height: 500 }} />
            </ScrollView>
        </View>
    )
}

export default ResultAIScanEyes

const styles = StyleSheet.create({
    blankHeader:{
        height:getStatusBarHeight()+_moderateScale(8)
    },  
    dot: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: '#28A745',
        marginRight: _moderateScale(4)
    },
    overView__box__leftEye: {
        width: _moderateScale(8 * 14),
        height: _moderateScale(8 * 14),
        borderRadius: _moderateScale(8 * 2)
    },
    overView__box: {
        width: _widthScale(350),
        // height: _moderateScale(8 * 40),
        // borderWidth:1,
        alignSelf: 'center',
        // bottom: _moderateScale(8 * 3),
        // position: 'absolute',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 2)
    },
    overView: {
        width: _width,
        // height: _moderateScale(8 * 60),
        paddingTop: _moderateScale(8 * 4),
        paddingBottom: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F9FD'
    }
})