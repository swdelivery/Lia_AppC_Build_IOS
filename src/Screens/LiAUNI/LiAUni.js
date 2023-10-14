import React, { useEffect, useState } from 'react';
import { Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigation } from '../../../rootNavigation';
import { BG_GREY_OPACITY_5, BLACK, BLUE, GREEN_SUCCESS, GREY, WHITE } from '../../Constant/Color';
import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';

import moment from 'moment';
import { getCourseChapterById, getCourseIdByChapter, takeChapters, takeDataByCode } from '../../Redux/Action/LiaUniAction';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import ModalListChapter from './ModalListChapter';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';





const LiAUni = props => {

    const [listData, setListData] = useState([])

    const [showModalListChapter, setShowModalListChapter] = useState({
        show: false,
        data: {}
    })

    const [infoCourse, setInfoCourse] = useState({})

    useEffect(() => {
        _getData(props?.route?.params?.item)
    }, [])

    const _getData = async (item) => {

        let result = await takeDataByCode(item?.code);
        if (result?.isAxiosError) return
        setInfoCourse(result?.data?.data)

        let resultTakeChapters = await getCourseIdByChapter(item?._id)

        let listSessionsTemp = result?.data?.data?.sections?.map(item => {
            return {
                title: item,
                data: []
            }
        })

        // console.log({listSessionsTemp});

        resultTakeChapters?.data?.data?.map((item, index) => {

            let findIndex = listSessionsTemp?.findIndex(itemFind => itemFind?.title?.code == item?.sectionCode);
            if (findIndex !== -1) {
                listSessionsTemp[findIndex].data.push(item)
            }
        })

        // console.log({ listSessionsTemp });

        setListData(listSessionsTemp)
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setShowModalListChapter({
                        show: true,
                        data: item
                    })
                }}
                style={{ flex: 1 }}>
                <View
                    style={[styles.itemConsultingTag]}>
                    <Text style={[
                        styles.itemConsultingTag__text,
                    ]}>
                        {index + 1}. {item?.name}
                    </Text>
                    <Text style={[
                        styles.itemConsultingTag__text,
                        {color:GREY,marginLeft:12},
                        
                    ]}>
                        {item?.description}
                    </Text>
                    {
                        item?.takeCourseChapter?.completeAt ? 
                        <Text style={{...stylesFont.fontNolanBold,color:GREEN_SUCCESS,fontStyle:'italic'}}>
                            Hoàn thành: {moment(item?.takeCourseChapter?.completeAt).format('LT')} - {moment(item?.takeCourseChapter?.completeAt).format('DD/MM/YYYY')}
                        </Text>
                        :
                        <></>
                    }
                </View>
               
            </TouchableOpacity>

        )
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom bgColor={'transparent'} barStyle={'dark-content'}/>
            <ModalListChapter
                data={showModalListChapter?.data}
                hide={() => {
                    setShowModalListChapter({
                        show: false,
                        data: {}
                    })
                }}
                show={showModalListChapter?.show} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={sizeIcon.lxlg} source={require('../../Icon/backBlack.png')} />
                </TouchableOpacity>
                <Text style={styles.header__title}>
                    ĐÀO TẠO
                </Text>
                <Image style={[sizeIcon.lxlg, { opacity: 0 }]} source={require('../../Icon/backBlack.png')} />
            </View>

           
            {/* <View style={{ width: '100%', height: _moderateScale(4), backgroundColor: BG_GREY_OPACITY_2 }} /> */}

            <SectionList
                ListFooterComponent={<View style={{ height: 50 }} />}
                ListHeaderComponent={
                    <View style={{
                        padding: _moderateScale(8 * 2)
                    }}>
                        <Text style={{
                            ...stylesFont.fontNolanBold,
                            fontSize: _moderateScale(16)
                        }}>
                            {infoCourse?.name}
                        </Text>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(15),
                            color: GREY,
                            marginVertical: _moderateScale(4)
                        }}>
                            {infoCourse?.chapterCount} Chương | {infoCourse?.lessonCount} Bài học
                        </Text>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(15),
                            color: GREY,
                        }}>
                            {infoCourse?.description}
                        </Text>
                    </View>
                }
                sections={listData}
                keyExtractor={(item, index) => index}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title: { name ,description} } }) => (
                    <View style={{ backgroundColor: BLUE, paddingLeft: _moderateScale(8), paddingVertical: _moderateScale(8) }}>
                        <Text style={[{
                        },
                        {
                            ...stylesFont.fontNolan500,
                            color: BLACK,
                            fontSize: _moderateScale(15),
                            flex: 1
                        },
                        { ...stylesFont.fontNolanBold }
                        ]}>
                            {name}
                        </Text>
                    </View>
                )}
            />

        </View>

    );
};

const styles = StyleSheet.create({
    itemConsultingTag: {
        paddingVertical: _moderateScale(8 * 2),
        borderBottomWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_5,
        paddingHorizontal: _moderateScale(8 * 2.5),
        // flexDirection: 'row'
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



export default LiAUni;