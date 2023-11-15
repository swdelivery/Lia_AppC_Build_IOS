import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Screen from '@Components/Screen'
import Header from './Components/Header'
import { TabBar, TabView } from 'react-native-tab-view';
import { BASE_COLOR, BLACK, BORDER_COLOR, RED, THIRD_COLOR, WHITE } from '@Constant/Color';
import { _moderateScale, _width } from '@Constant/Scale';
import { URL_ORIGINAL } from '@Constant/Url';
import ListServices from './Components/ListServices';
import { getAllServiceGroup } from '@Redux/Action/ServiceGroup';
import { useDispatch, useSelector } from 'react-redux';
import Text from '@Components/Text';
import { getStateShowModalAddServiceToBooking } from '@Redux/booking/selectors';
import ModalConfirmService from './Components/ModalConfirmService';
import { openModalAddServiceToBooking } from '@Redux/booking/actions';
import LinearGradient from 'react-native-linear-gradient';
import { sizeText } from '@Constant/Text';
import { navigation } from 'rootNavigation';

const NewPickerServiceBooking = () => {
    const dispatch = useDispatch()
    const [routes, setRoutes] = useState([]);
    const [index, setIndex] = useState(0);

    const listServiceGroup = useSelector(state => state.serviceGroupReducer?.listServiceGroup)

    const { isShowModalAddServiceToBooking } = useSelector(getStateShowModalAddServiceToBooking)

    console.log({ isShowModalAddServiceToBooking });


    useEffect(() => {

        var condition = {
            condition: {
                parentCode: {
                    equal: null
                }
            },
            "sort": {
                "orderNumber": -1
            },
            "limit": 100,
            "page": 1
        }

        dispatch(getAllServiceGroup(condition))

    }, [])

    useEffect(() => {
        if (listServiceGroup?.length > 0) {
            console.log({ listServiceGroup });
            let tempListGR = [...listServiceGroup].map(item => {
                return {
                    ...item,
                    key: item?.code,
                }
            })
            setRoutes([{ key: 'all', name: 'Tất cả', code: 'ALL' }, ...tempListGR])
        }
    }, [listServiceGroup])


    const _hideModalConfirmService = useCallback(() => {
        dispatch(openModalAddServiceToBooking(false))
    }, [])

    const _handleConfirmOrder = useCallback(() => {
        navigation.goBack()
    }, [])

    const renderTabBar = (props) => {
        return (
            <>
                <TabBar
                    tabStyle={{ flexDirection: 'row', alignItems: 'center', width: 'auto', height: 'auto', marginTop: _moderateScale(8 * 1) }}
                    {...props}
                    indicatorStyle={{ backgroundColor: 'transparent' }}
                    style={{
                        backgroundColor: 'transparent',
                        shadowOffset: { height: 0, width: 0 },
                        shadowColor: 'transparent',
                        shadowOpacity: 0,
                        elevation: 0,
                    }}
                    inactiveColor="grey"
                    activeColor={BASE_COLOR}
                    scrollEnabled
                    getLabelText={({ route }) => route.name}
                    renderLabel={({ route, focused, color }) => (
                        <>
                            {
                                focused ?
                                    <View style={styles.tabActive}>
                                        <Text weight='bold' color={WHITE}>
                                            {route?.name}
                                        </Text>
                                    </View>
                                    :
                                    <View style={styles.tab}>
                                        <Text color={BASE_COLOR}>
                                            {route?.name}
                                        </Text>
                                    </View>
                            }
                        </>


                    )}
                />
            </>
        )
    }
    const renderScene = ({ route }) => {
        return (
            <ListServices currGrChoice={``} route={route} />
        )
    };

    return (
        <Screen safeBottom>
            <ModalConfirmService data={isShowModalAddServiceToBooking?.data} isShow={isShowModalAddServiceToBooking?.flag} hideModal={_hideModalConfirmService} />
            <Header />
            {
                routes?.length > 0 ?
                    <TabView
                        renderTabBar={renderTabBar}
                        swipeEnabled={true}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        lazy
                    />
                    : <></>
            }
            <View style={styles.bottomAction}>
                <TouchableOpacity
                    onPress={_handleConfirmOrder}
                    style={styles.btnAction}>
                    <LinearGradient
                        style={[StyleSheet.absoluteFillObject, { borderRadius: 8, }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={["#01AB84", "#186A57"]}
                    />
                    <Text style={[sizeText.normal_bold, { color: WHITE }]}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>
            </View>

        </Screen>
    )
}

export default NewPickerServiceBooking

const styles = StyleSheet.create({
    btnAction: {
        marginHorizontal: _moderateScale(8 * 2),
        height: _moderateScale(8 * 5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomAction: {
        height: _moderateScale(8 * 7),
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
        width: _width,
        justifyContent: 'center',
        // alignItems:'center'
    },
    tabActive: {
        paddingHorizontal: _moderateScale(8 * 2.5),
        height: _moderateScale(8 * 3.5),
        borderRadius: 4,
        backgroundColor: BASE_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab: {
        paddingHorizontal: _moderateScale(8 * 2.5),
        height: _moderateScale(8 * 3.5),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: BASE_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    }
})