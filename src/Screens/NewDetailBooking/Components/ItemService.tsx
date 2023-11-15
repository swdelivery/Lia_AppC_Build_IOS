import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR, BORDER_COLOR, PRICE_ORANGE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const ItemService = () => {
    return (
        <View style={styles.itemService}>
            <Row alignItems='flex-start' gap={8 * 2}>
                <Image style={styles.avatarService} source={{ uri: `http://14.161.18.75:5143/public/service/1700031428278gBJk.png` }} />
                <Column style={{ flex: 1 }}>
                    <Row gap={8 * 4} >
                        <Text numberOfLines={1} style={styleElement.flex} color={BASE_COLOR} weight='bold'>
                            Cắt Mí T-2023 ProMax
                        </Text>
                        <Text color={PRICE_ORANGE} weight='bold'>
                            12.000.000 VNĐ
                        </Text>
                    </Row>
                    <Column>
                        {
                            [1, 2]?.map((item, index) => {
                                return (
                                    <Text>
                                        - Gói chăm sóc tận nhà 1 tháng
                                    </Text>
                                )
                            })
                        }
                    </Column>
                </Column>
            </Row>
        </View>
    )
}

export default ItemService

const styles = StyleSheet.create({
    itemService: {
        padding: _moderateScale(8 * 2),
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR
    },
    avatarService: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: 8
    },
})