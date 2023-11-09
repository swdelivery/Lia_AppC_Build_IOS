import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigation } from '../../../rootNavigation';
import { BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK, BLUE_FB, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE } from '../../Constant/Color';
import { _moderateScale } from '../../Constant/Scale';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { createTakeExamQuestion, getQuestions, getTakeExamQuestions, submitTakeExam } from '../../Redux/Action/LiaUniAction';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';

import { alertCustomNotAction } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';


const listOptions = ['A', 'B', "C", "D"]

const StartExam = props => {

    const [infoLession, setInfoLession] = useState({})
    const [listQuestions, setListQuestions] = useState([])

    // const [currTakeExam, setCurrTakeExam] = useState({})

    useEffect(() => {
        _getData()
    }, [])

    const _getData = async () => {
        console.log(props?.route?.params);
        let result = await getQuestions(props?.route?.params?.finalExamId)
        if (result?.isAxiosError) return
        let tempList = [...result?.data?.data]
        console.log({ tempList });

        let reusultGetDataExamQuestion = await getTakeExamQuestions(
            props?.route?.params?.takeExam?._id, {}
        )
        if (reusultGetDataExamQuestion?.isAxiosError) return
        tempList = tempList?.map(item => {
            if (reusultGetDataExamQuestion?.data?.data?.find(itemFind => itemFind?.examQuestionId == item?._id)) {
                return {
                    ...item,
                    codeAnswerChoice: reusultGetDataExamQuestion?.data?.data?.find(itemFind => itemFind?.examQuestionId == item?._id)?.answerCode
                }
            } else {
                return {
                    ...item,
                }
            }
        })
        setListQuestions(tempList)
    }

    const _handleChoice = async (idQuestion, codeAnswer, question) => {
        let tempList = [...listQuestions];
        console.log({ tempList, idQuestion, codeAnswer, question });

        let result = await createTakeExamQuestion({
            "examId": props?.route?.params?.takeExam?.examId,
            "takeExamId": props?.route?.params?.takeExam?._id,
            "examQuestionId": idQuestion,
            "answerCode": codeAnswer
        })
        if (result?.isAxiosError) return;

        let indexFinded = tempList?.findIndex(itemFind => itemFind?._id == idQuestion);
        if (indexFinded != -1) {
            tempList[indexFinded]['codeAnswerChoice'] = codeAnswer
        }
        setListQuestions(tempList)


    }

    const _handleCheckAnswer = async () => {
        let tempList = [...listQuestions]?.filter(item => item?.codeAnswerChoice == item?.correctAnswerCode);


        if (tempList?.length < props?.route?.params?.takeExam?.minCorrectToPass) {
            return alertCustomNotAction(`Chưa đạt`, `Cần ít nhất ${props?.route?.params?.takeExam?.minCorrectToPass} câu trả lời đúng!`)
        }
        let result = await submitTakeExam(props?.route?.params?.takeExam?._id)
        if (result?.isAxiosError) return;
        alertCustomNotAction(`Kết quả`, `Số lượng đáp án đúng: ${tempList?.length}/${listQuestions?.length}`)
        if (props?.route?.params?._onModalShow) {
            props?.route?.params?._onModalShow()
        }
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={sizeIcon.lxlg} source={require('../../Icon/backBlack.png')} />
                </TouchableOpacity>
                <Text style={styles.header__title}>
                    {infoLession?.name}
                </Text>
                <Image style={[sizeIcon.lxlg, { opacity: 0 }]} source={require('../../Icon/backBlack.png')} />
            </View>
            <ScrollView>
                {
                    listQuestions?.map((item, index) => {
                        return (
                            <View style={{
                                borderBottomWidth: 8,
                                borderBottomColor: BG_GREY_OPACITY_2,
                                paddingBottom: 16
                            }}>
                                <View style={{ margin: 16 }}>
                                    <View style={styleElement.rowAliCenter}>
                                        <View style={styles.verticalLine}/>
                                        <Text>
                                            Câu hỏi {index + 1}/{listQuestions?.length}
                                        </Text>
                                    </View>
                                    <Text style={{
                                        ...stylesFont.fontNolanBold,
                                        fontSize: _moderateScale(15),
                                        color: GREY_FOR_TITLE,
                                        marginLeft:_moderateScale(8*1.5)
                                    }}>
                                        {item?.name}
                                    </Text>
                                </View>
                                <View style={{ paddingHorizontal: 16 }}>
                                    {
                                        item?.options?.map((itemOption, indexOption) => {
                                            return (
                                                <TouchableOpacity
                                                    disabled={props?.route?.params?.takeExam?.completeAt}
                                                    onPress={() => _handleChoice(item?._id, itemOption?.code, item)}
                                                    style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={[styleElement.centerChild, {
                                                        width: _moderateScale(8 * 4),
                                                        height: _moderateScale(8 * 4),
                                                        borderRadius: _moderateScale(8 * 4 / 2),
                                                        backgroundColor: BG_GREY_OPACITY_2,
                                                        marginRight: 12
                                                    },
                                                    itemOption?.code == item?.codeAnswerChoice && { backgroundColor: BLUE_FB }
                                                    ]}>
                                                        <Text style={[itemOption?.code == item?.codeAnswerChoice && { color: WHITE }]}>
                                                            {itemOption['code']}
                                                        </Text>
                                                    </View>
                                                    <Text style={[{ fontSize: _moderateScale(15), flex: 1, ...stylesFont.fontNolanBold, color: GREY }, itemOption?.code == item?.codeAnswerChoice && { color: BLUE_FB, ...stylesFont.fontNolanBold }]}>
                                                        {itemOption?.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                            </View>
                        )
                    })
                }


            </ScrollView>

            <View style={[{
                paddingVertical: _moderateScale(8),
                paddingBottom: getBottomSpace() + _moderateScale(8),
                paddingHorizontal: _moderateScale(8 * 2),
                backgroundColor: WHITE,
                borderTopWidth: 0.5,
                borderColor: BG_GREY_OPACITY_5,
                width: '100%',
            },
            ]}>
                {
                    props?.route?.params?.takeExam?.completeAt ?
                        <>
                        </>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                _handleCheckAnswer()
                            }}
                            style={[{
                                height: _moderateScale(8 * 5),
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: GREEN_SUCCESS,
                            },
                            listQuestions?.find(item => !item?.codeAnswerChoice) && { backgroundColor: BG_GREY_OPACITY_5, opacity: 0.5 }
                            ]}>

                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                Chấm điểm
                            </Text>
                        </TouchableOpacity>
                }

            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    verticalLine:{
        width: _moderateScale(4),
        height: _moderateScale(8 * 2.5),
        backgroundColor: '#FA4664',
        marginRight: _moderateScale(8)
    },
    itemConsultingTag: {
        paddingVertical: _moderateScale(8 * 2),
        borderBottomWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5,
        paddingHorizontal: _moderateScale(8 * 2.5),
        flexDirection: 'row'
    },
    itemConsultingTag__text: {
        ...stylesFont.fontNolan500,
        color: BLACK,
        fontSize: _moderateScale(15),
        flex: 1
    },
    header__title: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(16),
        color: BLACK
    },
    header: {
        width: '100%',
        height: _moderateScale(8 * 7),
        borderBottomWidth: 0.5,
        borderBottomColor: BG_GREY_OPACITY_5,
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 1),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})



export default StartExam;