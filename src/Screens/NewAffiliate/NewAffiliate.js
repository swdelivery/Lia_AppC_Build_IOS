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
import { getInfoUserReducer } from '@Redux/Selectors'
import Animated from 'react-native-reanimated'
import useHapticCallback from 'src/Hooks/useHapticCallback'
import ModalFlashMsg from '@Components/ModalFlashMsg/ModalFlashMsg'
import useVisible from 'src/Hooks/useVisible'

const NewAffiliate = memo(() => {

    const { infoUser } = useSelector(getInfoUserReducer);
    const [showModalInfoRanked, setShowModalInfoRanked] = useState(false)
    const [showModalRequireBecomeCTV, setShowModalRequireBecomeCTV] = useState(false)
    const [showModalShareCodeAffiliate, setShowModalShareCodeAffiliate] = useState(false)
    const [currPartnerLevel, setCurrPartnerLevel] = useState({})
    const [stepUnlockAffiliate, setStepUnlockAffiliate] = useState({})

    const [flagRequireDoneStepToShareCode, setFlagRequireDoneStepToShareCode] = useState(false)

    useEffect(() => {
        _getPartnerLevel()
        _checkStep(infoUser?._id)
    }, [])

    const _checkStep = async (id) => {
        let result = await checkStepUnlockAffiliate(id)
        if (result?.isAxiosError) return

        let { isCollaburator, serviceUsed, diaryFinished, sharedDiary } = result?.data?.data
        if (isCollaburator && serviceUsed && diaryFinished && sharedDiary) {
            setStepUnlockAffiliate(result?.data?.data);
        }
    }

    const _getPartnerLevel = async () => {
        let result = await getPartnerLevel();
        if (result?.isAxiosError) return
        store.dispatch({
            type: ActionType.SAVE_LIST_PARTNER_LEVEL,
            payload: result?.data?.data
        })
        let findCurrPartnerLevel = result?.data?.data?.find(item => item?.code == infoUser?.levelCode)
        setCurrPartnerLevel(findCurrPartnerLevel)

    }

    const _handlePressIntiveBtn = useHapticCallback(() => {

        if (stepUnlockAffiliate?.isCollaburator) {
            setShowModalShareCodeAffiliate(old => !old)
        } else {
            setFlagRequireDoneStepToShareCode(true)
            setTimeout(() => {
                setFlagRequireDoneStepToShareCode(false)
            }, 300);
        }
    }, [stepUnlockAffiliate])

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <Banner setShowModalInfoRanked={setShowModalInfoRanked} />
                <BtnRanked data={currPartnerLevel} />
                <View style={{ height: _moderateScale(8) }} />
                <TutMakeMoney
                    flagRequireDoneStepToShareCode={flagRequireDoneStepToShareCode}
                />
                <View style={{ height: _moderateScale(8) }} />
                <ListF1Btn />
                <View style={{ height: _moderateScale(8) }} />
                <CheckOrderBtn />
                <View style={{ height: _moderateScale(8) }} />
                <QA />

                <TouchableOpacity
                    onPress={() => {
                        _handlePressIntiveBtn()
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
