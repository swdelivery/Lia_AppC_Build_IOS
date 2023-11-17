import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { IconHospital, IconLocationBase, IconPhoneBase, IconPhoneWhite, IconRightArrow } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { _moderateScale } from '@Constant/Scale'
import { BASE_COLOR, WHITE } from '@Constant/Color'
import Column from '@Components/Column'
import { Branch } from '@typings/branch'
import { useDispatch } from 'react-redux'
import { selectBranch } from '@Redux/booking/actions'



type Props = {
    data: Branch;
    onClose: () => void;
};
const CardBranch = ({ data, onClose }: Props) => {

    const dispatch = useDispatch()

    const _handleChoiceBranch = useCallback(() => {
        dispatch(selectBranch(data))
        onClose()
    }, [data]);

    return (
        <TouchableOpacity
            onPress={_handleChoiceBranch}
            activeOpacity={.8} style={[styles.container, shadow]}>
            <Column gap={16}>
                <Row gap={16}>
                    <View style={{
                        width: _moderateScale(8 * 3),
                    }}>
                        <IconHospital style={sizeIcon.lg} />
                    </View>
                    <Text style={{ flex: 1 }} weight='bold'>
                        {data?.name}
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
                        {data?.phone}
                    </Text>
                </Row>

                <Row gap={16}>
                    <View style={{
                        width: _moderateScale(8 * 3),
                    }}>
                        <IconLocationBase style={sizeIcon.md} />
                    </View>
                    <Text style={{ flex: 1 }}>
                        {data?.address}
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
