import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { BG_BEAUTY } from '../../Constant/Color';
import { getTreatmentDetailForPartner } from '../../Redux/Action/TreatmentAction';
import ItemTreatmentDetail from './Components/ItemTreatmentDetail';
import { _moderateScale } from '../../Constant/Scale';
import _isEmpty from 'lodash/isEmpty'
import { stylesFont } from '../../Constant/Font';
import { IconEmpty } from '@Components/Icon/Icon';
import Column from '@Components/Column';
import Text from '@Components/Text';
import Screen from '@Components/Screen';
import { useFocused } from 'src/Hooks/useNavigation';

const TreatmentHistory = memo((props) => {

    const dispatch = useDispatch()

    const [listTreamentDetail, setListTreatmentDetail] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    useFocused(() => {
        _getListTreatmentDetail()
    })

    const _getListTreatmentDetail = async () => {
        let resultGetTreatmentDetailForPartner = await getTreatmentDetailForPartner({
            condition: {
                status: {
                    in: ["PENDING", "COMPLETE"]
                }
            },
            limit: 1000
        })
        if (resultGetTreatmentDetailForPartner?.isAxiosError) return;
        setListTreatmentDetail(resultGetTreatmentDetailForPartner?.data?.data)
    }


    const onRefresh = async () => {
        setRefreshing(true)
        _getListTreatmentDetail()
        setRefreshing(false)
    }

    return (
        <Screen style={[styles.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, marginTop: 8 * 2 }}
                style={{ paddingHorizontal: _moderateScale(8 * 2) }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            >
                {
                    !_isEmpty(listTreamentDetail) ?
                        <Column gap={8 * 2}>
                            {
                                listTreamentDetail?.map((item, index) => {
                                    return (
                                        <ItemTreatmentDetail key={index} data={item} />
                                    )
                                })
                            }
                        </Column>
                        :
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Column marginTop={8 * 10} gap={8 * 2} alignItems='center'>
                                <IconEmpty width={8 * 10} height={8 * 10} />
                                <Text fontStyle='italic'>
                                    Bạn chưa có lịch sử điều trị
                                </Text>
                            </Column>
                        </View>
                }

                <View style={{ height: _moderateScale(8 * 10) }} />

            </ScrollView>

        </Screen>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    }
})

export default TreatmentHistory;
