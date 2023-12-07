import React, { memo, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { IconDoubleRightArrow } from '../../Components/Icon/Icon'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { _moderateScale } from '../../Constant/Scale'
import { checkStepUnlockAffiliate } from '../../Redux/Action/Affiilate'
import { getPartnerLevel } from '../../Redux/Action/InfoAction'
import * as ActionType from '../../Redux/Constants/ActionType'
import store from "../../Redux/store"
import Banner from './Components/Banner'
import BtnRanked from './Components/BtnRanked'
import CheckOrderBtn from './Components/CheckOrderBtn'
import Header from './Components/Header'
import ListF1Btn from './Components/ListF1Btn'
import ModalRequireBecomeCTV from './Components/ModalRequireBecomeCTV'
import ModalShareCodeAffiliate from './Components/ModalShareCodeAffiliate'
import ModalShowInfoRanked from './Components/ModalShowInfoRanked'
import QA from './Components/QA'
import TutMakeMoney from './Components/TutMakeMoney'

const NewAffiliate = memo(() => {

    const [showModalInfoRanked, setShowModalInfoRanked] = useState(false)
    const [showModalRequireBecomeCTV, setShowModalRequireBecomeCTV] = useState(false)
    const [showModalShareCodeAffiliate, setShowModalShareCodeAffiliate] = useState(false)
    const [currPartnerLevel, setCurrPartnerLevel] = useState({})
    const [stepUnlockAffiliate, setStepUnlockAffiliate] = useState({})
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    useEffect(() => {
        _getPartnerLevel()
        _checkStep(infoUserRedux?._id)
    }, [])

    const _checkStep = async (id) => {
        let result = await checkStepUnlockAffiliate(id)
        if (result?.isAxiosError) return

        setStepUnlockAffiliate(result?.data?.data);
    }

    const _getPartnerLevel = async () => {

        let result = await getPartnerLevel();
        if (result?.isAxiosError) return

        store.dispatch({
            type: ActionType.SAVE_LIST_PARTNER_LEVEL,
            payload: result?.data?.data
        })

        let findCurrPartnerLevel = result?.data?.data?.find(item => item?.code == infoUserRedux?.levelCode)
        setCurrPartnerLevel(findCurrPartnerLevel)

    }

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <Banner setShowModalInfoRanked={setShowModalInfoRanked} />
                <BtnRanked data={currPartnerLevel} />
                <View style={{ height: _moderateScale(8) }} />
                <TutMakeMoney />
                <View style={{ height: _moderateScale(8) }} />
                <ListF1Btn />
                <View style={{ height: _moderateScale(8) }} />
                <CheckOrderBtn />
                <View style={{ height: _moderateScale(8) }} />
                <QA />

                <TouchableOpacity
                    onPress={() => {
                        if (stepUnlockAffiliate?.isCollaburator) {
                            setShowModalShareCodeAffiliate(old => !old)
                        } else {
                            setShowModalRequireBecomeCTV(old => !old)
                        }
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
            <ModalShowInfoRanked isShow={showModalInfoRanked} onHideModal={() => setShowModalInfoRanked(false)} />
            <ModalRequireBecomeCTV isShow={showModalRequireBecomeCTV} onHideModal={() => setShowModalRequireBecomeCTV(false)} />
            <ModalShareCodeAffiliate isShow={showModalShareCodeAffiliate} onHideModal={() => setShowModalShareCodeAffiliate(false)} />

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
