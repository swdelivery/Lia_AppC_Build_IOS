import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR, BORDER_COLOR, PRICE_ORANGE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { IconPlusBase, IconPlusGrey } from '@Components/Icon/Icon'
import { styleElement } from '@Constant/StyleElement'
import Column from '@Components/Column'


type Props = {
    onPress: (item) => void;
}

const ListBeautyInsurance = ({ onPress }: Props) => {

    const ItemInsurance = () => {
        return (
            <TouchableOpacity>
                <Column
                    gap={4}
                    borderRadius={8}
                    borderWidth={1}
                    borderColor={BORDER_COLOR}
                    padding={8 * 2}
                    marginTop={8 * 2}
                    marginHorizontal={8 * 2} >
                    <Row justifyContent='space-between'>
                        <Text weight='bold'>
                            Bảo hiểm làm đẹp cá nhân
                        </Text>
                        <Text weight='bold' color={PRICE_ORANGE}>
                            500.000 VNĐ
                        </Text>
                    </Row>
                    <Text>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </Text>
                </Column>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <Row marginHorizontal={8 * 2} justifyContent='space-between'>
                <Text size={14} weight='bold'>Bảo hiểm làm đẹp </Text>

                <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={onPress}>
                    <IconPlusBase width={8 * 2} height={8 * 2} />
                </TouchableOpacity>
            </Row>
            {
                [1, 2]?.map((item, index) => {
                    return (
                        <ItemInsurance key={index} />
                    )
                })
            }
        </View >
    )
}

export default ListBeautyInsurance

const styles = StyleSheet.create({})
