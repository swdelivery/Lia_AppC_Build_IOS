import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK, BLUE_FB, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, RED, WHITE } from '../../Constant/Color';
import { _moderateScale, _width } from '../../Constant/Scale';
import { createTakeExam, getCourseChapterById, takeExams, takeLessions } from '../../Redux/Action/LiaUniAction';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { LESSION ,START_EXAM} from '../../Navigation/ScreenKey';

const ModalListChapter = memo((props) => {

    const [listChoice, setListChoice] = useState([])
    const [listLesssions, setListLesssions] = useState([])
    const [infoFinalExam, setInfoFinalExam] = useState({})


    useEffect(() => {
        console.log({ x: props?.data });
    }, [props?.data])

    const _onModalShow = async () => {
        console.log(props?.data);

        let result2 = await getCourseChapterById(props?.data?._id)
        let result = await takeLessions(props?.data?._id)
        if (result?.isAxiosError) return
        setListLesssions(result?.data?.data);

        let resultTakeExams = await takeExams(props?.data?._id)
        if (resultTakeExams?.isAxiosError) return;

        let findFinalExam = resultTakeExams?.data?.data?.find(item => item?._id == props?.data?.finalExamId)
        if (findFinalExam?._id) {
            setInfoFinalExam(findFinalExam)
        }
        // setInfoExam(resultTakeExams?.data?.data)
    }

    const _handleStartExam = async () => {
        if (isEmpty(infoFinalExam?.takeExams)) {
            let result = await createTakeExam({
                examId: infoFinalExam?.id
            })
            if (result?.isAxiosError) return;
            navigation.navigate(START_EXAM, { idChapter: props?.data?._id, finalExamId: props?.data?.finalExamId, takeExam: result?.data?.data, _onModalShow })
        } else {
            navigation.navigate(START_EXAM, { idChapter: props?.data?._id, finalExamId: props?.data?.finalExamId, takeExam: infoFinalExam?.takeExams[0], _onModalShow })
        }
    }

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'flex-end',
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : false}
            // animationIn={'slideInUp'}
            // animationOut={'fadeOut'}
            backdropTransitionOutTiming={0}
            onModalHide={() => {
                setListChoice([])
                setListLesssions([])
                setInfoFinalExam([])
            }}
            onModalShow={() => {
                _onModalShow()
            }}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
            }}>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: _moderateScale(8 * 2), paddingTop: _moderateScale(8 * 2) }}>
                    <View style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100, opacity: 0 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                    </View>

                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                        {props?.data?.name}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            props?.hide()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>
                </View>
                    <ScrollView style={{}}>
                        <View style={{ height: _moderateScale(8 * 2) }} />
                        {
                            listLesssions?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(LESSION, { id: item?._id, _onModalShow })
                                        }}
                                        style={{
                                            borderTopWidth: 0.5,
                                            borderTopColor: BG_GREY_OPACITY_5,
                                            paddingVertical: 16,
                                            paddingHorizontal: 16,
                                            flexDirection: 'row', alignItems: 'center'
                                        }}>
                                        {/* <Image
                                            style={[sizeAvatar.small, { borderWidth: 0.5 }]}
                                            source={{
                                                uri: `${TRANG_BI_URL}${item?.fileAvatar?.link}`
                                            }} /> */}
                                        <View style={{ flex: 1, marginHorizontal: 8 }}>
                                            <Text style={{
                                                flex: 1,
                                                fontSize: _moderateScale(15),
                                                ...stylesFont.fontNolanBold,
                                                color:GREY_FOR_TITLE
                                            }}>
                                                {item?.name}
                                            </Text>
                                            <Text style={{
                                                flex: 1,
                                                fontSize: _moderateScale(13),
                                                color: GREY
                                            }}>
                                                {item?.description}
                                            </Text>
                                        </View>

                                        {
                                            item?.takeCourseLesson?.completeAt ?
                                                <Image style={sizeIcon.lg} source={require('../../Icon/tick_grey.png')} />
                                                :
                                                <></>
                                        }
                                    </TouchableOpacity>
                                )
                            })
                        }


                        <View style={{ height: 50 }} />
                    </ScrollView>
                {/* {
                    console.log({infoFinalExam,listLesssions})
                } */}

                {
                    listLesssions?.length > 0 && infoFinalExam?._id ?
                        <View style={[{
                            paddingVertical: _moderateScale(8),
                            // paddingBottom: getBottomSpace() + _moderateScale(0),
                            paddingHorizontal: _moderateScale(8 * 2),
                            backgroundColor: WHITE,
                            borderTopWidth: 0.5,
                            borderColor: BG_GREY_OPACITY_5,
                            // borderWidth: 2,
                            // position: 'absolute',
                            // bottom: 0,
                            width: '100%',
                        },
                        ]}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLACK }]}>
                                {infoFinalExam?.name}
                            </Text>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: BLACK }]}>
                                Số lượng câu hỏi: {infoFinalExam?.questionCount}
                            </Text>

                            {
                                infoFinalExam?.takeExams[0]?.completeAt ?
                                    <View>
                                        <View style={{ marginTop: 16, marginBottom: 8 }}>
                                            {
                                                infoFinalExam?.takeExams[0]?.isPass ?
                                                    <Text style={{ ...stylesFont.fontNolanBold, color: GREEN_SUCCESS, fontSize: _moderateScale(16) }}>
                                                        Trạng thái : Đạt {` (${infoFinalExam?.takeExams[0]?.countCorrectAnswer}/${infoFinalExam?.takeExams[0]?.countQuestion}) `}
                                                    </Text>
                                                    :
                                                    <Text style={{ ...stylesFont.fontNolanBold, color: RED, fontSize: _moderateScale(16) }}>
                                                        Trạng thái : Chưa đạt
                                                    </Text>
                                            }

                                            <Text style={{ marginTop: 8 }}>
                                                Đã nộp bài lúc : {moment(infoFinalExam?.takeExams[0]?.completeAt).format('LT')} - {moment(infoFinalExam?.takeExams[0]?.completeAt).format('DD/MM/YYYY')}
                                            </Text>



                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                _handleStartExam()
                                            }}
                                            style={[{
                                                height: _moderateScale(8 * 5),
                                                backgroundColor: WHITE,
                                                borderRadius: _moderateScale(8),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: BASE_COLOR,
                                                // flex: 1,
                                                marginTop: 8
                                            }]}>

                                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                                Xem lại đáp án
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={[
                                        listLesssions?.find(item => !item?.takeCourseLesson?.completeAt) && { opacity: 0.3 }
                                    ]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (listLesssions?.find(item => !item?.takeCourseLesson?.completeAt)) {
                                                    return alert('Cần phải hoàn thành các bài học trước khi kiểm tra')
                                                }
                                                _handleStartExam()
                                            }}
                                            style={[{
                                                height: _moderateScale(8 * 5),
                                                backgroundColor: WHITE,
                                                borderRadius: _moderateScale(8),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: BASE_COLOR,
                                                // flex: 1,
                                                marginTop: 8
                                            }]}>

                                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                                Bắt đầu làm bài
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>
                        :
                        <></>
                }

            </View>

        </Modal>
    );
});


const styles = StyleSheet.create({
    btnBranch__nameBranch: {
        flex: 1,
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    btnBranch: {
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(8),
        marginBottom: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    backAndTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingTop: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: BLUE_FB,
        paddingVertical: _moderateScale(6),
        marginTop: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: _width,
        height: _moderateScale(8 * 80),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 3)
    }
})

export default ModalListChapter;