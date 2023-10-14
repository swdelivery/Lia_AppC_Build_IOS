import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IconBackWhite } from '../../Components/Icon/Icon'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { _moderateScale } from '../../Constant/Scale'


import { TabBar, TabView } from 'react-native-tab-view'
import * as Color from '../../Constant/Color'
import { navigation } from '../../../rootNavigation'


const Tab1 = () => {
    return (
        <ScrollView>
            {
                [1, 2, 3, 4, 5, 6]?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                            }}
                            style={{
                                padding: _moderateScale(8 * 2),
                                borderBottomWidth: .5,
                                borderColor: 'rgba(0,0,0,.2)',
                                alignItems: 'center'
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={[stylesFont.fontNolanBold, , { fontSize: _moderateScale(14) }]}>
                                        {index + 1}. Cắt mí T-2022
                                    </Text>
                                </View>
                                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                        12.000.000 vnđ
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={[stylesFont.fontNolan, , { fontSize: _moderateScale(14) }]}>
                                        Phát sinh thưởng
                                    </Text>
                                </View>
                                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                        + 1.200.000 vnđ
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }

        </ScrollView>
    )
}

const Tab2 = () => {
    return (
        <ScrollView>
            {
                [1, 2, 3, 4, 5, 6]?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                            }}
                            style={{
                                padding: _moderateScale(8 * 2),
                                borderBottomWidth: .5,
                                borderColor: 'rgba(0,0,0,.2)',
                                alignItems: 'center'
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={[stylesFont.fontNolanBold, , { fontSize: _moderateScale(14) }]}>
                                        {index + 1}. Cắt mí T-2022
                                    </Text>
                                </View>
                                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                        12.000.000 vnđ
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={[stylesFont.fontNolan, , { fontSize: _moderateScale(14) }]}>
                                        Phát sinh thưởng
                                    </Text>
                                </View>
                                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                        + 1.200.000 vnđ
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                    <View style={{}}>
                                        <Text style={[stylesFont.fontNolan, , { fontSize: _moderateScale(14) }]}>
                                            Thời gian hẹn:
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-start' }}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.GREY }]}>
                                            19:00 - 20/10/2023
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                    <View style={{}}>
                                        <Text style={[stylesFont.fontNolan, , { fontSize: _moderateScale(14) }]}>
                                            Chi nhánh:
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-start' }}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: Color.GREY }]}>
                                            LiA Beauty 434 Cao Thắng p12, q10
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            <View style={{height:100}}/>
        </ScrollView>
    )
}

const InfoF1 = () => {

    const [routes] = useState([
        { key: 'first', title: 'Đơn hàng' },
        { key: 'third', title: 'Booking' },
    ]);
    const [index, setIndex] = useState(0);

    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center', marginTop: _moderateScale(0) }}
                {...props}
                indicatorStyle={{ backgroundColor: Color.BASE_COLOR }}
                style={{
                    backgroundColor: Color.WHITE,
                }}
                inactiveColor="grey"
                activeColor={Color.BASE_COLOR}
                labelStyle={[stylesFont.fontNolan500, {
                    fontSize: _moderateScale(14),
                }]}
                getLabelText={({ route }) => route.title}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Tab1 />
            case 'third':
                return <Tab2 />

            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View style={styles.header}>
                <View style={{
                    height: getStatusBarHeight()
                }} />
                <View style={styles.header__box}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                         onPress={()=>{
                            navigation.goBack()
                        }}
                        >
                            <IconBackWhite />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                            Nguyễn Văn Anh
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                    </View>
                </View>
            </View>
            <View style={{
                padding: _moderateScale(8 * 2)
            }}>
                <Text style={{ fontStyle: 'italic' }}>
                    Đã được giới thiệu vào ngày 31/09/2023
                </Text>
            </View>

            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />

        </View>
    )
}

export default InfoF1

const styles = StyleSheet.create({
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
    }
})