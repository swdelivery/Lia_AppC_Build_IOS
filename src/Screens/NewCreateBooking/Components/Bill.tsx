import { StyleSheet, View } from 'react-native'
import React from 'react'
import { _moderateScale } from '@Constant/Scale'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Column from '@Components/Column'
import { BASE_COLOR } from '@Constant/Color'

const Bill = () => {
    return (
        <View style={styles.container}>
            <Column  gap={8}>
                <Row style={{ justifyContent: 'space-between' }}>
                    <Text size={14} weight='bold'>Tổng tiền dịch vụ tạm tính: </Text>
                    <Text size={14} weight='regular'>10.000.000 VNĐ</Text>
                </Row>
                <Row style={{ justifyContent: 'space-between' }}>
                    <Text size={14} weight='bold'>Ưu đãi:</Text>
                    <Text size={14} weight='regular'>-1.000.000 VNĐ</Text>
                </Row>
                <Row style={{ justifyContent: 'space-between' }}>
                    <Text size={14} weight='bold'>Tổng thanh toán tạm tính:</Text>
                    <Text size={14} weight='bold' color={BASE_COLOR}>9.000.000 VNĐ</Text>
                </Row>
            </Column>
        </View>
    )
}

export default Bill

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: _moderateScale(8 * 2)
    }
})