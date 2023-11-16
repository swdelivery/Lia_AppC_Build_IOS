import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { IconPlusBase, IconPlusGrey } from '@Components/Icon/Icon'
import { styleElement } from '@Constant/StyleElement'


type Props = {
    onPress: (item) => void;
}

const ListBeautyInsurance = ({ onPress }: Props) => {



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
        </View >
    )
}

export default ListBeautyInsurance

const styles = StyleSheet.create({})