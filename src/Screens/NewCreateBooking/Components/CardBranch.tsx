import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconHospital, IconLocationBase, IconPhoneBase, IconPhoneWhite, IconRightArrow } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { _moderateScale } from '@Constant/Scale'
import { BASE_COLOR, WHITE } from '@Constant/Color'
import Column from '@Components/Column'

const CardBranch = () => {
    return (
        <TouchableOpacity activeOpacity={.8} style={[styles.container, shadow]}>
            <Column gap={16}>
                <Row gap={16}>
                    <View style={{
                        width: _moderateScale(8 * 3),
                    }}>
                        <IconHospital style={sizeIcon.lg} />
                    </View>
                    <Text style={{ flex: 1 }} weight='bold'>
                        Chi nhánh 3/2
                    </Text>
                    <TouchableOpacity>
                        <Row>
                            <Text style={{ fontStyle: 'italic' }} color={BASE_COLOR} size={12}>
                                Chi tiết
                            </Text>
                            <Text color={BASE_COLOR}>
                                {` >>`}
                            </Text>
                        </Row>
                    </TouchableOpacity>
                </Row>

                <Row gap={16}>
                    <View style={{
                        width: _moderateScale(8 * 3),
                    }}>
                        <IconPhoneBase style={sizeIcon.md} />
                    </View>
                    <Text style={{ flex: 1 }}>
                        0961096963
                    </Text>
                </Row>

                <Row gap={16}>
                    <View style={{
                        width: _moderateScale(8 * 3),
                    }}>
                        <IconLocationBase style={sizeIcon.md} />
                    </View>
                    <Text style={{ flex: 1 }}>
                        434 Đường Cao Thắng, P.12 , Quận 10
                    </Text>
                </Row>
            </Column>
        </TouchableOpacity>
    )
}

export default CardBranch

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8 * 2,
        borderRadius: 8,
        padding: 8 * 2,
        backgroundColor: WHITE
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3
}