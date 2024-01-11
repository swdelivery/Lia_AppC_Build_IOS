import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { getServiceByResScanningListState } from '@Redux/resultcanningeyes/selectors'
import ServiceItem from '@Screens/SoYoungService/components/ServiceItem'
import React, { memo, useCallback, useEffect } from 'react'
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { GREY_FOR_TITLE, NEW_BASE_COLOR } from '../../../Constant/Color'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import Image from '@Components/Image'
import { Service } from '@typings/serviceGroup'
import { RenderItemProps } from '@typings/common'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import { getServicesByResEye } from '@Redux/resultcanningeyes/actions'
import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'

const RecomendService = memo(() => {
    const dispatch = useDispatch()
    const { navigation } = useNavigate()
    const { dataServices } = useSelector(getServiceByResScanningListState)

    useEffect(() => {
        requestAnimationFrame(() => {
            dispatch(
                getServicesByResEye.request({
                    codeGroup: { equal: "MAT" },
                })
            );
        })
    }, [])

    const _renderItem = useCallback(({ item }: RenderItemProps<Service>) => {

        const _handleGoDetailService = (() => {
            navigation.navigate(ScreenKey.DETAIL_SERVICE, {
                service: item,
            });
        })
        return (
            <TouchableOpacity onPress={_handleGoDetailService} >
                <Image
                    style={styles.avatarService}
                    avatar={item.avatar} />
            </TouchableOpacity>
        )
    }, [])

    const _awesomeChildListKeyExtractor = useCallback(
        (item) => `awesome-child-key-${item._id}`,
        []
    );

    return (
        <AfterTimeoutFragment timeout={500}>
            <Column>
                <Column
                    margin={8 * 2}>
                    <Text
                        color={NEW_BASE_COLOR}
                        weight='bold'>
                        ĐỀ XUẤT DỊCH VỤ
                    </Text>
                </Column>
                <Column>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                        horizontal
                        keyExtractor={_awesomeChildListKeyExtractor}
                        renderItem={_renderItem}
                        data={dataServices} />
                </Column>
            </Column>
        </AfterTimeoutFragment>
    )
})

export default RecomendService


const styles = StyleSheet.create({
    contentContainerStyle: {
        gap: 8, paddingHorizontal: 8 * 2
    },
    avatarService: {
        width: 8 * 22,
        height: 8 * 22 * 9 / 16,
        borderRadius: 8
    }
})
