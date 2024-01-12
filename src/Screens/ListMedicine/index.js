import React, { memo, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import Header from '../../Components/Header/Header';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { BASE_COLOR, BG_BEAUTY, SECOND_COLOR, WHITE, GREY } from '../../Constant/Color';
import { _moderateScale } from '../../Constant/Scale';
import ItemMedicine from './Components/ItemMedicine';

import { getMedicalPrescription } from '../../Redux/Action/InfoAction';
import { styleElement } from '../../Constant/StyleElement';
import { stylesFont } from '../../Constant/Font';
import Screen from '@Components/Screen';
import LiAHeader from '@Components/Header/LiAHeader';
import { FocusAwareStatusBar } from '@Components/StatusBar';
import { FlatList } from 'react-native';
import Column from '@Components/Column';
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData';
import { IconEmptyData } from '@Components/Icon/Icon';
import Button from '@Components/Button/Button';
import { useNavigate } from 'src/Hooks/useNavigation';
import ScreenKey from '@Navigation/ScreenKey';


const index = memo((props) => {
    const dispatch = useDispatch()
    const { navigate } = useNavigate()
    const medicalPrescriptionRedux = useSelector(state => state?.infoReducer?.medicalPrescription)
    useEffect(() => {
        dispatch(getMedicalPrescription())
    }, [])

    const _renderItem = ({ item, index }) => {
        return <ItemMedicine data={item} />
    };

    const _handleCreateBooking = useCallback(() => {
        navigate(ScreenKey.CREATE_BOOKING)()
    }, [])

    return (
        <Screen style={styleElement.flex}>
            <FocusAwareStatusBar barStyle='light-content' />
            <LiAHeader safeTop title='Đơn thuốc' />

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
                data={medicalPrescriptionRedux}
                renderItem={_renderItem}
                keyExtractor={(item, index) => item._id}
            />
            {/* {
                medicalPrescriptionRedux?.length > 0 ?
                    <ScrollView contentContainerStyle={{ paddingHorizontal: _moderateScale(8 * 2), paddingTop: _moderateScale(8) }}>
                        {
                            medicalPrescriptionRedux?.map((item, index) => {
                                return (
                                    <ItemMedicine data={item} key={item?._id} />
                                )
                            })
                        }
                        <View style={{ height: 50 }} />
                    </ScrollView>
                    :
                    <View style={[{ flex: 1 }, styleElement.centerChild]}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                            Dữ liệu trống
                        </Text>
                    </View>
            } */}

        </Screen>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    }
})


export default index;
