import Button from '@Components/Button/Button';
import Column from '@Components/Column';
import LiAHeader from '@Components/Header/LiAHeader';
import { IconEmptyData } from '@Components/Icon/Icon';
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData';
import Screen from '@Components/Screen';
import { FocusAwareStatusBar } from '@Components/StatusBar';
import React, { memo, useCallback, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'src/Hooks/useNavigation';
import { WHITE } from '../../Constant/Color';
import ScreenKey from '../../Navigation/ScreenKey';
import { getTreatmentDetail } from '../../Redux/Action/InfoAction';
import ItemHistory from './component/ItemHistory';

const ListAllHistoryTreatment = memo((props) => {
    const dispatch = useDispatch()
    const { navigate } = useNavigate()

    const treatmentDetailRedux = useSelector(state => state?.infoReducer?.treatmentDetail)

    useEffect(() => {
        dispatch(getTreatmentDetail())
    }, [])

    const _renderItem = ({ item, index }) => {
        return <ItemHistory fullwidth key={index} data={item} />
    };

    const _handleCreateBooking = useCallback(() => {
        navigate(ScreenKey.CREATE_BOOKING)()
    }, [])


    return (
        <Screen style={{ flex: 1, backgroundColor: WHITE }}>
            <FocusAwareStatusBar barStyle='light-content' />
            <LiAHeader safeTop title='Lịch sử điều trị' />

            <FlatList
                contentContainerStyle={{ alignItems: 'center', paddingVertical: 8 * 2 }}
                ListEmptyComponent={
                    <Column marginTop={8 * 20} flex={1}>
                        <EmptyResultData>
                            <Column gap={8} alignItems='center'>
                                <IconEmptyData width={8 * 8} height={8 * 8} />
                                <Text>
                                    Làm đẹp cùng LiA
                                </Text>
                                <Button.Gradient
                                    onPress={_handleCreateBooking}
                                    height={8 * 4}
                                    borderRadius={8 * 4}
                                    width={8 * 20}
                                    horizontal
                                    colors={['#2A78BD', '#21587E']}
                                    title='Đặt hẹn ngay' />
                            </Column>
                        </EmptyResultData>
                    </Column>
                }
                data={treatmentDetailRedux}
                renderItem={_renderItem}
                keyExtractor={(item, index) => item._id}
            />
        </Screen>
    );
});



export default ListAllHistoryTreatment;
