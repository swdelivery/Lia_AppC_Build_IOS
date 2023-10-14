import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native'
import { WHITE, BTN_PRICE, BLACK_OPACITY_8, BASE_COLOR, BG_GREY_OPACITY_2, GREY } from '../../Constant/Color';
import { navigation } from '../../../rootNavigation';
import { styleElement } from '../../Constant/StyleElement';
import { _moderateScale } from '../../Constant/Scale';
import { sizeIcon } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import { TabBar, TabView } from 'react-native-tab-view';
import InfoProjSocial from './Components/InfoProjSocial'
import ListDonation from './Components/ListDonation'
import HistoryCost from './Components/HistoryCost';
import ModalDetailHistoryCost from './Components/ModalDetailHistoryCost'
import { alertCustomNotAction, formatMonney } from '../../Constant/Utils';
import ModalDonation from './Components/ModalDonation';
import {
    getSocialAssistancePostById,
    getPaymentSocialAssistanceById,
    getTopPaymentSocialAssistanceById,
    getExpenseDataById,
    getFileDataSocialAssistanceById
} from '../../Redux/Action/SocialAssistanceAction';

import { flow, groupBy, mapValues } from 'lodash'
import _ from 'lodash'
import moment from 'moment'
import ListImage from './Components/ListImage';
import ListVideo from './Components/ListVideo';
import { URL_ORIGINAL } from '../../Constant/Url';
import _isEmpty from 'lodash/isEmpty'
import { useSelector } from 'react-redux';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';

const Detail = memo((props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer)

    const [dataSocialPost, setDataSocialPost] = useState({})
    const [listPaymentSocialAssistance, setListPaymentSocialAssistance] = useState([])
    const [listTopPaymentSocialAssistance, setListTopPaymentSocialAssistance] = useState([])
    const [listExpenseSocialAssistance, setListExpenseSocialAssistance] = useState([])
    const [listImageSocialAssistance, setListImageSocialAssistance] = useState([])
    const [listVideoSocialAssistance, setListVideoSocialAssistance] = useState([])



    const [showModalDetailCost, setShowModalDetailCost] = useState({
        show: false,
        data: {}
    })
    const [showModalDonation, setShowModalDonation] = useState(false)

    const [routes] = useState([
        { key: 'first', title: 'Thông tin' },
        { key: 'second', title: 'Lượt quyên góp' },
        { key: 'third', title: 'Chi phí' },
        { key: 'fourth', title: 'Hình ảnh' },
        { key: 'five', title: 'Video' },
    ]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        _getDetailSocialProjById()
        _getPaymentSocialProById()
        _getTopPaymentSocialProById()
        _getExpenseDataById()
        _getFileDataById()
    }, [])

    const _getDetailSocialProjById = async () => {
        let result = await getSocialAssistancePostById(props?.route?.params?.id);
        if (result?.isAxiosError) return
        setDataSocialPost(result?.data?.data)
    }
    const _getPaymentSocialProById = async () => {
        let result = await getPaymentSocialAssistanceById(props?.route?.params?.id, {

        });
        if (result?.isAxiosError) return
        setListPaymentSocialAssistance(result?.data?.data)
    }
    const _getTopPaymentSocialProById = async () => {
        let result = await getTopPaymentSocialAssistanceById(props?.route?.params?.id);
        if (result?.isAxiosError) return
        setListTopPaymentSocialAssistance(result?.data?.data)
    }
    const _getExpenseDataById = async () => {
        let result = await getExpenseDataById(props?.route?.params?.id);
        if (result?.isAxiosError) return
        // setListExpenseSocialAssistance(result?.data?.data)

        let groups = _.groupBy(result?.data?.data, function (date) {
            return moment(date?.time).startOf('day').format();
        });

        let resultss = _.map(groups, function (group, day) {
            return {
                day: day,
                arrData: group
            }
        });
        resultss = resultss.reverse()
        setListExpenseSocialAssistance(resultss)
    }
    const _getFileDataById = async () => {
        let result = await getFileDataSocialAssistanceById(props?.route?.params?.id);
        if (result?.isAxiosError) return
        // setListTopPaymentSocialAssistance(result?.data?.data)
        setListImageSocialAssistance(result?.data?.data?.filter(item => item?.type == 'image'))
        setListVideoSocialAssistance(result?.data?.data?.filter(item => item?.type == 'video'))
    }

    const _handleGetMinePayment = async () => {
        let result = await getPaymentSocialAssistanceById(props?.route?.params?.id, {
            condition: {
                partnerId: {
                    equal: infoUserRedux?.infoUser?._id
                }
            }
        });
        if (result?.isAxiosError) return
        setListPaymentSocialAssistance(result?.data?.data)
    }

    const _handleGetAllPayment = async () => {
        let result = await getPaymentSocialAssistanceById(props?.route?.params?.id, {
        });
        if (result?.isAxiosError) return
        setListPaymentSocialAssistance(result?.data?.data)
    }


    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center', width: 'auto', height: 'auto' }}
                {...props}
                indicatorStyle={{ backgroundColor: 'transparent' }}
                style={{
                    backgroundColor: WHITE,
                    shadowOffset: { height: 0, width: 0 },
                    shadowColor: 'transparent',
                    shadowOpacity: 0,
                    elevation: 0,
                    // paddingLeft: _moderateScale(6)
                }}
                inactiveColor="grey"
                activeColor={BASE_COLOR}
                scrollEnabled
                getLabelText={({ route }) => route.title}
                renderLabel={({ route, focused, color }) => (
                    <View style={[stylesFont.fontDinTextPro, focused ? styles.tabItemActive : styles.tabItemNotActive]}>
                        <Text style={[
                            focused ? stylesFont.fontNolanBold : stylesFont.fontNolan,
                            focused ? styles.tabItem__textActive : styles.tabItem__textNoteActive
                        ]}>
                            {route.title}
                        </Text>
                    </View>
                )}
            />
        )
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                        <InfoProjSocial data={dataSocialPost?.description} isActiveTab={index == 0} />
                    </View>
                );
            case 'second':
                return (
                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                        <ListDonation
                            seeMine={_handleGetMinePayment}
                            seeAll={_handleGetAllPayment}
                            listTopPaymentSocialAssistance={listTopPaymentSocialAssistance}
                            listPaymentSocialAssistance={listPaymentSocialAssistance}
                            isActiveTab={index == 1} />
                    </View>
                );
            case 'third':
                return (
                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                        <HistoryCost
                            listExpenseSocialAssistance={listExpenseSocialAssistance}
                            pressed={_handlePressCost} isActiveTab={index == 2} />
                    </View>
                );
            case 'fourth':
                return (
                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                        <ListImage
                            listImageSocialAssistance={listImageSocialAssistance}
                            pressed={_handlePressCost} isActiveTab={index == 3} />
                    </View>
                );
            case 'five':
                return (
                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                        <ListVideo
                            listVideoSocialAssistance={listVideoSocialAssistance}
                            pressed={_handlePressCost} isActiveTab={index == 4} />
                    </View>
                );

            default:
                return null;
        }
    };

    const _handlePressCost = (item) => {

        setShowModalDetailCost(old => {
            return {
                ...old,
                show: true,
                data: item
            }
        })
    }

    const _handleConfirmDonation = (data) => {
        console.log({ data });
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom/>
            <ModalDonation
                hide={() => {
                    setShowModalDonation(false)
                }}
                socialProjectId={props?.route?.params?.id}
                // confirmDonation={_handleConfirmDonation}
                show={showModalDonation} />

            <ModalDetailHistoryCost
                hide={() => {
                    setShowModalDetailCost(old => {
                        return {
                            ...old,
                            show: false,
                            data: {}
                        }
                    })
                }}
                data={showModalDetailCost?.data}
                show={showModalDetailCost?.show} />

            <ImageBackground
                style={{ width: "100%", paddingBottom: _moderateScale(8 * 2) }}
                source={require('../../Image/header/header1.png')}>
                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Image
                            style={[sizeIcon.llg]}
                            source={require('../../Icon/back_left_white.png')} />
                    </TouchableOpacity>

                    <View style={[styleElement.rowAliCenter, { flex: 1, justifyContent: 'space-between', marginLeft: _moderateScale(8 * 2) }]}>
                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(18), color: WHITE }]}>
                            Dự án xã hội
                        </Text>
                    </View>
                </View>
            </ImageBackground>

            <ScrollView style={{ paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 2) }}>
                <View style={{ paddingHorizontal: _moderateScale(8) }}>
                    <View>
                        {
                            !_isEmpty(dataSocialPost?.representationFileArr) ?
                                <Image
                                    style={{
                                        width: "100%",
                                        height: _moderateScale(200),
                                        borderTopLeftRadius: _moderateScale(8 * 2),
                                        borderTopRightRadius: _moderateScale(8 * 2),
                                        backgroundColor: BG_GREY_OPACITY_2
                                    }}
                                    source={{ uri: `${URL_ORIGINAL}${dataSocialPost?.representationFileArr[0]?.link}` }} />
                                :
                                <Image
                                    style={{
                                        width: "100%",
                                        height: _moderateScale(200),
                                        borderTopLeftRadius: _moderateScale(8 * 2),
                                        borderTopRightRadius: _moderateScale(8 * 2),
                                        backgroundColor: BG_GREY_OPACITY_2
                                    }}
                                    source={{ uri: "" }} />
                        }

                        {/* <View style={{position:'absolute', bottom:_moderateScale(8*2), right:_moderateScale(8*2)}}>
                            <View style={[styleElement.rowAliCenter]}>
                                <TouchableOpacity onPress={()=>{
                                    setIndex(3)
                                }}>
                                    <Image style={[sizeIcon.llg]} source={require('../../Image/component/picture.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>{
                                    setIndex(4)
                                }}
                                style={{marginLeft:_moderateScale(8*2)}}>
                                    <Image style={[sizeIcon.lllg]} source={require('../../Image/component/video.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                    </View>

                    <View style={{ paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(8 * 2) }}>
                        <Text style={[stylesFont.fontNolanBold, styles.title]}>
                            {dataSocialPost?.name}
                        </Text>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: _moderateScale(8 * 2) }}>
                            <View style={{ flex: 2.25 }}>
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                        Lượt quyên góp
                            </Text>
                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8, alignSelf: 'center' }]}>
                                        {dataSocialPost?.countDonation}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 2.05, alignItems: 'center' }}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    Đạt được
                            </Text>
                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }]}>
                                    {formatMonney(dataSocialPost?.amountDonation)}
                                </Text>
                            </View>
                            <View style={{ flex: 1.7, justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModalDonation(true)
                                    }}
                                    style={styles.btnDetail}>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(13), color: WHITE }]}>Quyên góp</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: BLACK_OPACITY_8, marginLeft: _moderateScale(8) }]}>
                        {dataSocialPost?.summary}
                    </Text>
                </View>

                <View style={{ height: _moderateScale(8 * 3) }} />
                <TabView
                    renderTabBar={renderTabBar}
                    swipeEnabled={true}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    lazy
                />
                <View style={{ height: 100 }} />
            </ScrollView>

        </View>
    );
});


const styles = StyleSheet.create({
    tabItem__textActive: {
        fontSize: _moderateScale(14),
        color: BASE_COLOR,
        textAlign: 'center'
    },
    tabItem__textNoteActive: {
        fontSize: _moderateScale(14),
        color: GREY
    },


    tabItemActive: {
        // backgroundColor: BASE_COLOR,
        // borderRadius: _moderateScale(4),
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: BASE_COLOR
    },
    tabItemNotActive: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        // borderRadius: _moderateScale(4),
        // backgroundColor: BG_GREY_OPACITY_2,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },


    tabBar: {
        flexDirection: 'row',
        paddingTop: _moderateScale(8 * 2),
        backgroundColor: 'white',
        alignItems: 'center',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'red'
    },

    btnDetail: {
        backgroundColor: BTN_PRICE,
        // marginHorizontal: _moderateScale(4),
        marginLeft: _moderateScale(8),
        height: _moderateScale(8 * 3.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    title: {
        fontSize: _moderateScale(16),
        color: BLACK_OPACITY_8
    },
})

export default Detail;