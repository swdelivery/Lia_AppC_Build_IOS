import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View, RefreshControl, Text,ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { BG_BEAUTY } from '../../Constant/Color';
import { getTreatmentDetailForPartner } from '../../Redux/Action/TreatmentAction';
import ItemTreatmentDetail from './Components/ItemTreatmentDetail';
import { _moderateScale } from '../../Constant/Scale';
import _isEmpty from 'lodash/isEmpty'
import { stylesFont } from '../../Constant/Font';

const TreatmentHistory = memo((props) => {

    const dispatch = useDispatch()

    const [listTreamentDetail, setListTreatmentDetail] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        _getListTreatmentDetail()
    }, [])

    const _getListTreatmentDetail = async () => {
        let resultGetTreatmentDetailForPartner = await getTreatmentDetailForPartner({
            condition:{
                status:{
                    in:["PENDING", "COMPLETE"]
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
        <View style={[styles.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ paddingHorizontal: _moderateScale(8 * 2) }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            >
                {
                    !_isEmpty(listTreamentDetail) ?
                        <>
                            <View style={{ height: _moderateScale(16) }} />
                            {
                                listTreamentDetail?.map((item, index) => {
                                    return (
                                        <ItemTreatmentDetail bgWhite key={index} data={item} />
                                    )
                                })
                            }
                        </>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                Chưa có dữ liệu
                            </Text>
                        </View>
                }



                <View style={{height:_moderateScale(8*10)}}/>

            </ScrollView>

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    }
})

export default TreatmentHistory;