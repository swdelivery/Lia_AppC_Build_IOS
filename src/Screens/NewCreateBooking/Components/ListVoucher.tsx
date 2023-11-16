import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _moderateScale } from '@Constant/Scale'
import Text from '@Components/Text'
import CardVoucher from '@Components/Voucher/CardVoucher'
import Row from '@Components/Row'
import { BASE_COLOR } from '@Constant/Color'

const ListVoucher = () => {
    return (
        <View style={{}}>
            <Row  style={{ marginHorizontal: _moderateScale(8 * 2), justifyContent:'space-between' }}>
                <Text size={14} weight='bold'>Voucher </Text>

                <TouchableOpacity>
                    <Text style={{textDecorationLine:'underline'}} color={BASE_COLOR}>
                        Xem tất cả
                    </Text>
                </TouchableOpacity>
            </Row>

            <View style={{ marginTop: 8 }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 4, paddingLeft: _moderateScale(8 * 2) }}>
                    {
                        [1, 2, 3]?.map((item, index) => {
                            return (
                                <CardVoucher key={index} />
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default ListVoucher

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: _moderateScale(8 * 2)
    }
})