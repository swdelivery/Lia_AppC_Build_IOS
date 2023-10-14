import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import Header from './Components/Header'
import Banner from './Components/Banner'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import BtnRanked from './Components/BtnRanked'
import { _height, _moderateScale, _width } from '../../Constant/Scale'
import TutMakeMoney from './Components/TutMakeMoney'
import ListF1Btn from './Components/ListF1Btn'
import CheckOrderBtn from './Components/CheckOrderBtn'
import QA from './Components/QA'
import { stylesFont } from '../../Constant/Font'
import { IconDoubleRightArrow } from '../../Components/Icon/Icon'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom'
import Animated, { FadeInRight, FadeOut } from 'react-native-reanimated'
import ModalShowInfoRanked from './Components/ModalShowInfoRanked'
import ModalRequireBecomeCTV from './Components/ModalRequireBecomeCTV'
// import { ScrollView } from 'react-native-gesture-handler'
import ModalShareCodeAffiliate from './Components/ModalShareCodeAffiliate'
// import ModalDemo from './Components/ModalDemo'

const NewAffiliate = memo(() => {

    const [showModalInfoRanked, setShowModalInfoRanked] = useState(false)
    const [showModalRequireBecomeCTV, setShowModalRequireBecomeCTV] = useState(false)
    const [showModalShareCodeAffiliate, setShowModalShareCodeAffiliate] = useState(false)
    const [showModalDemo, setShowModalDemo] = useState(false)

    useEffect(() => {
        // Alert.alert('awdawd')
    }, [showModalDemo])

    return (
        <View style={styles.container}>

            <ModalShowInfoRanked isShow={showModalInfoRanked} onHideModal={() => setShowModalInfoRanked(false)} />
            <ModalRequireBecomeCTV isShow={showModalRequireBecomeCTV} onHideModal={() => setShowModalRequireBecomeCTV(false)} />

            <ModalShareCodeAffiliate isShow={showModalShareCodeAffiliate} onHideModal={() => setShowModalShareCodeAffiliate(false)} />

            {/* <View style={{
                    width:_width,
                    height:_height,
                    backgroundColor:'red'
                }}>

                </View> */}

            <Header />

            <ScrollView>
                <Banner setShowModalInfoRanked={setShowModalInfoRanked} />

                {/* <Animated.View entering={FadeInRight.delay(200)}> */}
                    <BtnRanked />
                {/* </Animated.View> */}
                <View style={{ height: _moderateScale(8) }} />

                {/* <Animated.View entering={FadeInRight.delay(200)}> */}
                    <TutMakeMoney />
                {/* </Animated.View> */}
                <View style={{ height: _moderateScale(8) }} />

                {/* <Animated.View entering={FadeInRight.delay(200)}> */}
                    <ListF1Btn />
                {/* </Animated.View> */}

                <View style={{ height: _moderateScale(8) }} />

                {/* <Animated.View entering={FadeInRight.delay(200)}> */}
                    <CheckOrderBtn />
                {/* </Animated.View> */}

                <View style={{ height: _moderateScale(8) }} />

                {/* <Animated.View entering={FadeInRight.delay(200)}> */}
                    <QA />
                {/* </Animated.View> */}


                <TouchableOpacity
                    onPress={() => {
                        setShowModalShareCodeAffiliate(old => !old)
                        // setShowModalRequireBecomeCTV(old => !old)
                    }}
                    style={styles.btnInvite}>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                        Giới thiệu bạn bè
                    </Text>
                    <View style={{
                        position: 'absolute',
                        right: _moderateScale(8 * 2)
                    }}>
                        <IconDoubleRightArrow style={{ width: _moderateScale(8 * 3), height: _moderateScale(8 * 3) }} />
                    </View>
                </TouchableOpacity>
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    )
})

export default NewAffiliate

const styles = StyleSheet.create({
    btnInvite: {
        width: _moderateScale(350),
        height: _moderateScale(8 * 5),
        backgroundColor: BASE_COLOR,
        alignSelf: 'center',
        marginTop: _moderateScale(8 * 4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8)
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})