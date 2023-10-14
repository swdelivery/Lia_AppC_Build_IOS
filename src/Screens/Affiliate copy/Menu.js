import React, { useRef, useEffect, useState, memo } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { GREY, WHITE, BASE_COLOR, SECOND_COLOR, BTN_PRICE, RED, BG_GREY_OPACITY_5, FOURTH_COLOR } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { navigation } from '../../../rootNavigation';
import moment from 'moment'

import Wallet from './Wallet/index'
import Service from './Service/index'
import Product from './Product/index'
import QAndA from './Q&A/index'
import StepToCollab from './StepToCollab/index'

import { getCollabStatistic } from '../../Redux/Action/InfoAction'
import { useDispatch } from 'react-redux';


const Menu = memo((props) => {

    const dispatch = useDispatch()


    const [currMonthFilter, setCurrMonthFilter] = useState(new Date())
    const [currMenu, setCurrMenu] = useState('1')

    useEffect(() => {
        let startOfMonth = new Date(moment(currMonthFilter).startOf('month').format('YYYY-MM-DD'));
        let endOfMonth = new Date(moment(currMonthFilter).endOf('month').format('YYYY-MM-DD'));

        console.log({
            startOfMonth,
            endOfMonth
        });
        dispatch(getCollabStatistic({
            "condition": {
                'updated': {
                    'from': startOfMonth,
                    'to': endOfMonth
                }
            }
        }))
    }, [currMonthFilter])

    const _handlePreMonth = () => {
        setCurrMonthFilter(moment(currMonthFilter).subtract(1, 'months').format('YYYY-MM-DD'))
    }

    const _handleNextMonth = () => {
        setCurrMonthFilter(moment(currMonthFilter).subtract(-1, 'months').format('YYYY-MM-DD'))
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <View style={[styles.bannerStatis, {
                width: "100%",
                justifyContent: 'space-between',
                //  position: 'absolute', width: "100%", zIndex: 1 
            }]}>
                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BTN_PRICE }]}>
                    Thống kê
                </Text>

                <View style={[styleElement.rowAliCenter]}>
                    <TouchableOpacity style={{ backgroundColor: BTN_PRICE, padding: _moderateScale(4), borderRadius: _moderateScale(4) }} onPress={_handlePreMonth}>
                        <Image style={[sizeIcon.xxs]} source={require('../../Icon/douPre.png')} />
                    </TouchableOpacity>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), width: _moderateScale(8 * 12), textAlign: 'center', color: BTN_PRICE }]}>
                        {
                            moment(currMonthFilter).format("MM/YYYY")
                        }
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: BTN_PRICE, padding: _moderateScale(4), borderRadius: _moderateScale(4) }} onPress={_handleNextMonth}>
                        <Image style={[sizeIcon.xxs]} source={require('../../Icon/douNext.png')} />
                    </TouchableOpacity>
                </View>
            </View> */}


            <View style={{ flex: 1, flexDirection: 'row' }}>
{/*                
               <View style={{ width: _moderateScale(65) }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: _moderateScale(8 * 4) }}>
                        {
                            currMenu == '1' ?
                                <TouchableOpacity style={[styles.btnMenu, styles.btnMenuActive]}>
                                    <Image style={[sizeIcon.lllg]} source={require('../../NewIcon/a_wallet.png')} />
                                    <Text style={[stylesFont.fontNolan500, styles.btnMenu__text_a]}>Ví</Text>
                                </TouchableOpacity>
                                :
                                <View style={{ opacity: 0.7 }}>
                                    <TouchableOpacity onPress={() => setCurrMenu('1')} style={styles.btnMenu}>
                                        <Image style={[sizeIcon.lllg]} source={require('../../NewIcon/i_wallet.png')} />
                                        <Text style={[stylesFont.fontNolan500, styles.btnMenu__text_i]}>Ví</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                        {
                            currMenu == '2' ?
                                <TouchableOpacity style={[styles.btnMenu, styles.btnMenuActive]}>
                                    <Image style={[sizeIcon.lllg]} source={require('../../NewIcon/a_lip.png')} />
                                    <Text style={[stylesFont.fontNolan500, styles.btnMenu__text_a]}>Dịch vụ</Text>
                                </TouchableOpacity>
                                :
                                <View style={{ opacity: 0.7 }}>
                                    <TouchableOpacity onPress={() => setCurrMenu('2')} style={styles.btnMenu}>
                                        <Image style={[sizeIcon.lllg]} source={require('../../NewIcon/i_lip.png')} />
                                        <Text style={[stylesFont.fontNolan500, styles.btnMenu__text_i]}>Dịch vụ</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                        {
                            currMenu == '4' ?
                                <TouchableOpacity style={[styles.btnMenu, styles.btnMenuActive]}>
                                    <Image style={[sizeIcon.lllg]} source={require('../../NewIcon/a_guide.png')} />
                                    <Text style={[stylesFont.fontNolan500, styles.btnMenu__text_a]}>Hướng dẫn</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => setCurrMenu('4')} style={styles.btnMenu}>
                                    <Image style={[sizeIcon.lllg]} source={require('../../NewIcon/i_guide.png')} />
                                    <Text style={[stylesFont.fontNolan500, styles.btnMenu__text_i]}>Hướng dẫn</Text>
                                </TouchableOpacity>
                        }
                        {
                            currMenu == '5' ?
                                <TouchableOpacity style={[styles.btnMenu, styles.btnMenuActive]}>
                                    <Image style={[sizeIcon.lllg]} source={require('../../NewIcon/a_qa.png')} />
                                    <Text style={[stylesFont.fontNolan500, styles.btnMenu__text_a]}>Hỏi đáp</Text>
                                </TouchableOpacity>
                                :
                                <View style={{ opacity: 0.7 }}>
                                    <TouchableOpacity onPress={() => setCurrMenu('5')} style={styles.btnMenu}>
                                        <Image style={[sizeIcon.lllg]} source={require('../../NewIcon/i_qa.png')} />
                                        <Text style={[stylesFont.fontNolan500, styles.btnMenu__text_i]}>Hỏi đáp</Text>
                                    </TouchableOpacity>
                                </View>
                        }

                    </ScrollView>
                </View>
                */}
               
                <View style={{ flex: 1 }}>
                    {
                        currMenu == "1" ?
                            <Wallet /> : <></>
                    }
                    {
                        currMenu == "2" ?
                            <Service /> : <></>
                    }
                    {
                        currMenu == "3" ?
                            <Product /> : <></>
                    }
                    {
                        currMenu == "4" ?
                            <StepToCollab /> : <></>
                    }
                    {
                        currMenu == "5" ?
                            <QAndA /> : <></>
                    }
                </View>

            </View>
        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    elevation: 11
}


const styles = StyleSheet.create({
    btnMenu__text_a: {
        fontSize: _moderateScale(14),
        color: BASE_COLOR
    },
    btnMenu__text_i: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    btnMenuActive: {
        backgroundColor: 'rgba(7, 140, 122,0.1)',
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: BASE_COLOR
    },
    btnMenu: {
        height: _moderateScale(100),
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerStatis: {
        backgroundColor: WHITE,
        height: _moderateScale(8 * 6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2),
        borderBottomWidth: _moderateScale(0.5),
        borderBottomColor: BG_GREY_OPACITY_5
    },
    btnOptionCash__text: {
        fontSize: _moderateScale(14),
        color: WHITE,
        alignSelf: 'center',
        marginTop: _moderateScale(4)
    },
    btnOptionCash: {
        width: _moderateScale(8 * 9),
        height: _moderateScale(8 * 9),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(2),
        borderColor: WHITE,
        backgroundColor: BTN_PRICE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: _moderateScale(8 * 2)
    },
    btnCopy: {
        // width:"100%",
        flex: 1,
        marginLeft: _moderateScale(8 * 1),
        borderRadius: _moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: _moderateScale(2),
        borderWidth: _moderateScale(1),
        borderColor: WHITE
    },
    bannerPrice__textPrice: {
        color: '#5D5FEF',
        fontSize: _moderateScale(28),
        alignSelf: 'center',
        marginBottom: _moderateScale(8 * 1),
        marginTop: _moderateScale(8)
    },
    bannerPrice: {
        marginHorizontal: _moderateScale(8 * 4),
        backgroundColor: 'rgba(255, 255, 255,0.8)',
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 1),
        borderRadius: _moderateScale(8),
        marginTop: _moderateScale(8 * 2)
    },
    btnOptions__icon: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain'
    },
    btnOptions: {
        width: _moderateScale(100),
        height: _moderateScale(100),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: _moderateScale(20),
        color: WHITE,
        marginLeft: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 3)
    },

    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(300),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
}
)



export default Menu;