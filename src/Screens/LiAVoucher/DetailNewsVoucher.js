import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { BLACK, WHITE } from '../../Constant/Color'
import LiAHeader from '../../Components/Header/LiAHeader'
import { _moderateScale } from '../../Constant/Scale'
import RenderHTML from '../../Components/RenderHTML/RenderHTML'
import { getConfigData } from '../../Redux/Action/OrtherAction'

const DetailNewsVoucher = memo(() => {

    const [dataHTML, setDataHTML] = useState('')

    useEffect(() => {
        _getData()
    }, [])

    const _getData = async () => {
        let result = await getConfigData("DEMO_NEWS_VOUCHER");
        if (result?.isAxiosError) return;
        setDataHTML(result)
    }

    return (
        <View style={styles.container}>
            <LiAHeader titleColor={BLACK} bg={WHITE} barStyle={'dark-content'} title={"Thông tin"} />
            <ScrollView>
                <View style={{ marginTop: _moderateScale(0), paddingHorizontal: _moderateScale(8 * 2) }}>
                    {
                        dataHTML?.value ?
                            <RenderHTML data={dataHTML?.value} />
                            :
                            <></>
                    }

                </View>
            </ScrollView>
        </View>
    )
})

export default DetailNewsVoucher

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})