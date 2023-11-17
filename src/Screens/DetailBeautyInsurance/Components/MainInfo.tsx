import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale } from '@Constant/Scale'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { BLACK, PRICE_ORANGE } from '@Constant/Color'
import { formatMonney } from '@Constant/Utils'

const MainInfo = memo((props) => {


    return (
        <View style={styles.box}>
            <Column gap={8}>
                <Text weight='bold' size={14}>
                    {`NAME`}
                </Text>
                <Text weight='bold' size={14} color={PRICE_ORANGE}>
                    {formatMonney(100000)} VNĐ
                </Text>
                <Text weight='regular' size={14} color={BLACK}>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                </Text>
            </Column>
        </View>
    )
})

export default MainInfo

const styles = StyleSheet.create({
    box: {
        margin: _moderateScale(8 * 2)
    }
})
