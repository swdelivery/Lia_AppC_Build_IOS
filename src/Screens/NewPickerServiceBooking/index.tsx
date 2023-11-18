import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
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
import { getDataCreateBookingState, getServiceListFilterState } from '@Redux/booking/selectors';
import ModalConfirmService from './Components/ModalConfirmService';
import { getListServiceFilter, openModalAddServiceToBooking } from '@Redux/booking/actions';
import LinearGradient from 'react-native-linear-gradient';
import { sizeText } from '@Constant/Text';
import { navigation } from 'rootNavigation';
import { formatMonney } from '@Constant/Utils';

const NewPickerServiceBooking = () => {
    const dispatch = useDispatch()
    const [routes, setRoutes] = useState([]);
    const [index, setIndex] = useState(0);

    const { dataBranch, dataDoctor, dataPractitioner, dataServices } = useSelector(getDataCreateBookingState)
    const { data: dataListService } = useSelector(getServiceListFilterState)

    const { isShowModalAddServiceToBooking } = useSelector(getDataCreateBookingState)

    useEffect(() => {
        if (dataDoctor?.code) {
            dispatch(getListServiceFilter.request({
                treatmentDoctorCode: dataDoctor?.code
            }))
        } else if (dataPractitioner?.code) {
            dispatch(getListServiceFilter.request({
                practitionerCode: dataPractitioner?.code
            }))
        } else if (dataBranch?.code) {
            dispatch(getListServiceFilter.request({
                branchCode: dataBranch?.code
            }))
        }
    }, [dataBranch?.code, dataDoctor?.code, dataPractitioner?.code])

    useEffect(() => {
        let listServiceTemp = dataListService

        let newArray = [...new Set(listServiceTemp.flatMap(service => service.codeGroup))]
            .map(codeGroup => ({
                codeGroup,
                listService: listServiceTemp.filter(service => service.codeGroup.includes(codeGroup))
            }));

        newArray = newArray?.map(item => {
            return {
                ...item,
                key: item?.codeGroup,
                name: item?.codeGroup,
                code: item?.codeGroup
            }
        })
        setRoutes([{ key: 'all', name: 'Tất cả', code: 'ALL', listService: dataListService }, ...newArray])
    }, [dataListService])

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
            <ListServices route={route} />
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
            {
                dataServices?.length > 0 ?
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
                                Xác nhận ({`${formatMonney(dataServices?.reduce((sum, { price }) => sum + price, 0))}`} VNĐ)
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <></>
            }
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
